import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Here you can integrate with:
    // 1. Email service (SendGrid, Mailgun, etc.)
    // 2. Database to store contacts
    // 3. Notification service
    
    // For now, we'll log it and return success
    console.log('Contact form submission:', {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      message: data.message,
      timestamp: new Date().toISOString()
    });

    // TODO: Implement actual email sending or database storage
    // Example with SendGrid:
    /*
    import sgMail from '@sendgrid/mail';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: 'elhoucineqara114@gmail.com',
      from: 'https://qaratech.vercel.app/',
      subject: `New Contact from ${data.firstName} ${data.lastName}`,
      text: `
        Name: ${data.firstName} ${data.lastName}
        Email: ${data.email}
        Phone: ${data.phone}
        
        Message:
        ${data.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `
    });
    */

    return json({
      success: true,
      message: 'Your message has been sent successfully! I will get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
};

