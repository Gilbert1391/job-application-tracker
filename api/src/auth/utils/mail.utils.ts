import * as nodemailer from 'nodemailer';

export const verifyAccount = async (username: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: 'postmaster@sandboxd94a1b05803e4f2a8247275e3d85e90e.mailgun.org', //use prod env variables
      pass: '952717ea7ffda32a58ac508b8f561986-2b0eef4c-96d69005', //use prod env variables
    },
  });

  const mailOptions = {
    from: '"Job application tracker team" <jbt-noreply@accountprotection.com>',
    to: username,
    subject: 'Verify your account',
    text: `Thanks for using job-application-tracker! Please confirm your email address by clicking on the link below`,
    html: `<b>Thanks for using job-application-tracker! Please confirm your email address by clicking on the link below</b>`,
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
