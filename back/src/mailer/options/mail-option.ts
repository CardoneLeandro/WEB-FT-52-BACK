import Mail from 'nodemailer/lib/mailer';

export const mailOptions = (dto, subject, template): Mail.Options => {
  return {
    from: {
      name: 'Movimiento Juvenil Peregrinos',
      address: process.env.GMAIL_USER,
    },
    to: {
      name: dto.name,
      address: dto.email,
    },
    subject: subject,
    html: template,
  };
};
