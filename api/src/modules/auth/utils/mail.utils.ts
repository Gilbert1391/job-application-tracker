import * as nodemailer from 'nodemailer';
import { smtpConfig } from '../../../config/smtp.config';

export const verifyAccount = async (username: string): Promise<void> => {
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
    from: '"Job application tracker team" <jbt-noreply@accountprotection.com>',
    to: username,
    subject: 'Verify your account',
    text: `Thanks for using job-application-tracker! Please confirm your email address by clicking on the link below`,
    html: `<p>Thanks for using job-application-tracker! Please confirm your email address by clicking on the link below</p>`,
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
