import { json } from '@sveltejs/kit';
import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { generateArticleEmailHtml } from '$lib/server/email-template';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
  // Check authorization to ensure only Vercel Cron (or us) can trigger this
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const scheduledEmails = await getCollection(COLLECTIONS.SCHEDULED_EMAILS);
    const blogPosts = await getCollection(COLLECTIONS.BLOG_POSTS);

    // Find all pending emails that are due to be sent
    const now = new Date();
    const pendingEmails = await scheduledEmails.find({
      status: 'pending',
      scheduledAt: { $lte: now }
    }).toArray();

    if (pendingEmails.length === 0) {
      return json({ success: true, message: 'Aucun email en attente' });
    }

    // Initialize SMTP transport
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    });

    let sentCount = 0;
    let errorCount = 0;

    for (const job of pendingEmails) {
      try {
        const post = await blogPosts.findOne({ slug: job.slug });
        if (!post) {
          // If post is deleted, mark job as failed
          await scheduledEmails.updateOne({ _id: job._id }, { $set: { status: 'failed', error: 'Article introuvable' } });
          errorCount++;
          continue;
        }

        const articleUrl = `${job.origin}/blog/${post.slug}`;
        const articleTitle = post.title?.fr || post.title?.en || 'Nouvel Article';
        const articleExcerpt = post.excerpt?.fr || post.excerpt?.en || '';

        const htmlContent = generateArticleEmailHtml(articleTitle, articleExcerpt, articleUrl);

        await transporter.sendMail({
          from: `"QaraTech" <${env.SMTP_FROM || 'no-reply@qaratech.com'}>`,
          to: env.SMTP_FROM || 'no-reply@qaratech.com',
          bcc: job.email,
          subject: `Nouvel article : ${articleTitle}`,
          html: htmlContent
        });

        // Mark as sent
        await scheduledEmails.updateOne({ _id: job._id }, { $set: { status: 'sent', sentAt: new Date() } });
        sentCount++;
      } catch (err: any) {
        console.error(`Erreur d'envoi pour le job ${job._id}:`, err);
        await scheduledEmails.updateOne({ _id: job._id }, { $set: { status: 'failed', error: err.message } });
        errorCount++;
      }
    }

    return json({ success: true, sentCount, errorCount });
  } catch (err) {
    console.error('Erreur CRON send-emails:', err);
    return json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
};
