import { json } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifyAdminToken } from '$lib/server/admin-auth';
import { COLLECTIONS, getCollection } from '$lib/server/db-collections';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { generateArticleEmailHtml } from '$lib/server/email-template';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies, url }) => {
  const authenticated = verifyAdminToken(cookies.get(ADMIN_COOKIE));
  if (!authenticated) {
    return json({ error: 'Non autorisé' }, { status: 401 });
  }

  let requestData: any = {};
  
  try {
    requestData = await request.json();
  } catch(e) {
    return json({ error: 'JSON Invalide' }, { status: 400 });
  }

  const { slug, email, scheduledAt } = requestData;

  if (!slug || !email) {
    return json({ error: 'Slug et email requis' }, { status: 400 });
  }

  try {
    const collection = await getCollection(COLLECTIONS.BLOG_POSTS);
    const post = await collection.findOne({ slug });

    if (!post) {
      return json({ error: 'Article introuvable' }, { status: 404 });
    }

    if (scheduledAt) {
      // Planifier l'email au lieu de l'envoyer maintenant
      const scheduledEmails = await getCollection(COLLECTIONS.SCHEDULED_EMAILS);
      await scheduledEmails.insertOne({
        slug,
        email,
        scheduledAt: new Date(scheduledAt),
        status: 'pending',
        createdAt: new Date(),
        origin: url.origin
      });

      return json({ success: true, message: 'Email planifié avec succès' });
    }

    // Configure Nodemailer for Brevo SMTP (Envoi immédiat)
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp-relay.brevo.com',
      port: parseInt(env.SMTP_PORT || '587', 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS
      }
    });

    const origin = url.origin;
    const articleUrl = `${origin}/blog/${post.slug}`;
    const articleTitle = post.title?.fr || post.title?.en || 'Nouvel Article';
    const articleExcerpt = post.excerpt?.fr || post.excerpt?.en || '';

    const htmlContent = generateArticleEmailHtml(articleTitle, articleExcerpt, articleUrl);

    const info = await transporter.sendMail({
      from: `"QaraTech" <${env.SMTP_FROM || 'no-reply@qaratech.com'}>`,
      to: env.SMTP_FROM || 'no-reply@qaratech.com',
      bcc: email,
      subject: `Nouvel article : ${articleTitle}`,
      html: htmlContent
    });

    console.log('Message sent: %s', info.messageId);

    // Enregistrer l'envoi immédiat dans la BDD pour l'historique
    const scheduledEmails = await getCollection(COLLECTIONS.SCHEDULED_EMAILS);
    await scheduledEmails.insertOne({
      slug,
      email,
      scheduledAt: new Date(),
      status: 'sent',
      createdAt: new Date(),
      sentAt: new Date(),
      origin: url.origin,
      messageId: info.messageId
    });

    return json({ success: true, messageId: info.messageId });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    
    // Si c'est un envoi immédiat qui a échoué, on peut aussi l'enregistrer
    try {
      if (slug && email) {
         const scheduledEmails = await getCollection(COLLECTIONS.SCHEDULED_EMAILS);
         await scheduledEmails.insertOne({
           slug,
           email,
           scheduledAt: new Date(),
           status: 'failed',
           createdAt: new Date(),
           origin: url.origin,
           error: err instanceof Error ? err.message : 'Erreur inconnue'
         });
      }
    } catch(e) {}

    return json({ error: 'Erreur lors du traitement de l\'email' }, { status: 500 });
  }
};
