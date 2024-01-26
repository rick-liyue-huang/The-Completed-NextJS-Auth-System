import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// used it in register and login
export const sendEmail = async (email: string, token: string) => {
  // will create new-verification page
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Please Click <a href="${confirmLink}">Here</a> to confirm email!</p>`,
  });
};
