import * as nodemailer from 'nodemailer';
import { smtpConfig } from '../../../config/smtp.config';
import { SignUpPayload } from '../interfaces/sign-up.payload.interface';

export const verifyAccount = async (payload: SignUpPayload): Promise<void> => {
  const { username, verificationKey } = payload;
  const transporter = nodemailer.createTransport({
    host: smtpConfig.host,
    port: 587,
    secure: false,
    auth: {
      user: smtpConfig.user,
      pass: smtpConfig.password,
    },
  });

  const mailOptions = {
    from: '"Job application tracker team" <jat-noreply@accountprotection.com>',
    to: username,
    subject: 'verify your account',
    html: `
    <div style="font-size:14px;">
      <p>Thanks for using job-application-tracker! Please confirm your email address by clicking on the link below.</p>
      <a href='http://localhost:3000/auth/activate/${verificationKey}'>
        http://localhost:3000/auth/activate/${verificationKey}
      </a>
      <p>If you did not sign up for a JAT account please disregard this email.</p> 
      <p>Happy hunting!</p>
    </div> 
    `,
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log('Message sent: %s', info.messageId);

    transporter.close();
  });
};
