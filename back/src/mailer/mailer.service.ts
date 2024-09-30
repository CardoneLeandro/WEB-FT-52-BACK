import { Injectable } from '@nestjs/common';
import { transporter } from 'config/mailer.config';
import Mail from 'nodemailer/lib/mailer';
import { UserWelcomeDto } from './dto/user-welcome.dtos';
import { welcomeTemplate } from './templates/welcome.template';
import { UserDonationDto } from './dto/user-donation.dtos';
import { donationTemplate } from './templates/donation.template';

@Injectable()
export class MailerService {
  async sendEmailWelcome(userWelcomeDto: UserWelcomeDto) {
    try {
      const mailOptions: Mail.Options = {
        from: {
          name: 'Movimiento Juvenil Peregrinos',
          address: process.env.GMAIL_USER,
        },
        to: {
          name: userWelcomeDto.name,
          address: userWelcomeDto.email,
        },
        subject: 'Bienvenido al Movimiento Juvenil Peregrinos',
        html: welcomeTemplate(userWelcomeDto.name),
      };
      await transporter.sendMail(mailOptions);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendEmailDonation(userDonationDto: UserDonationDto) {
    try {
      const mailOptions: Mail.Options = {
        from: {
          name: 'Movimiento Juvenil Peregrinos',
          address: process.env.GMAIL_USER,
        },
        to: {
          name: userDonationDto.name,
          address: userDonationDto.email
        },
        subject: '!Gracias por tu donación!',
        html: donationTemplate({name: userDonationDto.name, amount: userDonationDto.amount})
      };
      await transporter.sendMail(mailOptions);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
