import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import type { VisitMeta } from '$lib/server/visitor-meta';

export interface VisitorRecord extends VisitMeta {
	id: string;
	createdAt: string;
}

export interface VisitorStats {
	totals: {
		visits: number;
		uniqueVisitors: number;
		today: number;
		countries: number;
	};
	byCountry: Array<{ country: string; countryCode: string; count: number }>;
	byPage: Array<{ path: string; count: number }>;
	byDevice: Array<{ device: string; count: number }>;
	byBrowser: Array<{ browser: string; count: number }>;
	recent: VisitorRecord[];
}

async function collection() {
	return getCollection<VisitorRecord>(COLLECTIONS.VISITS);
}

export async function recordVisit(meta: VisitMeta): Promise<void> {
	const entry: VisitorRecord = {
		...meta,
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString()
	};
	await (await collection()).insertOne(entry);
}

function startOfToday(): string {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d.toISOString();
}

export async function getVisitorStats(limit = 50): Promise<VisitorStats> {
	const col = await collection();
	const today = startOfToday();

	const [totalsAgg, byCountry, byPage, byDevice, byBrowser, recent, uniqueVisitors] =
		await Promise.all([
			col
				.aggregate<{ visits: number; today: number; countries: number }>([
					{
						$facet: {
							all: [{ $count: 'visits' }],
							today: [{ $match: { createdAt: { $gte: today } } }, { $count: 'today' }],
							countries: [{ $group: { _id: '$countryCode' } }, { $count: 'countries' }]
						}
					},
					{
						$project: {
							visits: { $ifNull: [{ $arrayElemAt: ['$all.visits', 0] }, 0] },
							today: { $ifNull: [{ $arrayElemAt: ['$today.today', 0] }, 0] },
							countries: { $ifNull: [{ $arrayElemAt: ['$countries.countries', 0] }, 0] }
						}
					}
				])
				.toArray(),
			col
				.aggregate<{ country: string; countryCode: string; count: number }>([
					{ $group: { _id: { countryCode: '$countryCode', country: '$country' }, count: { $sum: 1 } } },
					{ $sort: { count: -1 } },
					{ $limit: 20 },
					{
						$project: {
							_id: 0,
							countryCode: '$_id.countryCode',
							country: '$_id.country',
							count: 1
						}
					}
				])
				.toArray(),
			col
				.aggregate<{ path: string; count: number }>([
					{ $group: { _id: '$path', count: { $sum: 1 } } },
					{ $sort: { count: -1 } },
					{ $limit: 15 },
					{ $project: { _id: 0, path: '$_id', count: 1 } }
				])
				.toArray(),
			col
				.aggregate<{ device: string; count: number }>([
					{ $group: { _id: '$device', count: { $sum: 1 } } },
					{ $sort: { count: -1 } },
					{ $project: { _id: 0, device: '$_id', count: 1 } }
				])
				.toArray(),
			col
				.aggregate<{ browser: string; count: number }>([
					{ $group: { _id: '$browser', count: { $sum: 1 } } },
					{ $sort: { count: -1 } },
					{ $limit: 8 },
					{ $project: { _id: 0, browser: '$_id', count: 1 } }
				])
				.toArray(),
			col.find({}).sort({ createdAt: -1 }).limit(limit).toArray(),
			col.distinct('visitorId')
		]);

	const totals = totalsAgg[0] ?? { visits: 0, today: 0, countries: 0 };

	return {
		totals: {
			visits: totals.visits,
			today: totals.today,
			countries: totals.countries,
			uniqueVisitors: uniqueVisitors.length
		},
		byCountry,
		byPage,
		byDevice,
		byBrowser,
		recent
	};
}
