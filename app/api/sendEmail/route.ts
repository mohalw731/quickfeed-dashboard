import { NextResponse } from 'next/server';
import { ContactUsEmail } from '@/components/emails/ContactUsEmail';
import ConfirmationEmail from '@/components/emails/ConfirmationEmail';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { organisation, name, email, message } = formData;

    const { error: ContactError } = await resend.emails.send({
      from: 'QuickFeed <onboarding@resend.dev>',
      to: ['sidricobjork@gmail.com'],
      subject: 'New Contact Form Submission',
      react: ContactUsEmail({ 
        name,
        email,
        organisation, 
        message 
      }),
    });

    const { error: ConfirmationError } = await resend.emails.send({
      from: 'QuickFeed <onboarding@resend.dev>',
      to: email,
      subject: 'Contact Confirmation',
      react: ConfirmationEmail({ 
        name, 
        email,
        organisation, 
        message 
      }),
    });

    if (ContactError) {
      console.error('Error sending email:', ContactError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    };

    if (ConfirmationError) {
      console.error('Error sending email:', ConfirmationError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    };

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}