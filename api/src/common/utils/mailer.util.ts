import * as nodemailer from 'nodemailer';
import { smtpConfig } from './../../config/smtp.config';
import { EmailPayload } from '../interfaces/email-payload.interface';
import { BadGatewayException } from '@nestjs/common';

export const sendEmail = async (payload: EmailPayload): Promise<void> => {
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

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(info.messageId);
  } catch (error) {
    console.log(error);
    throw new BadGatewayException('Mail delivery failed');
  }
};
