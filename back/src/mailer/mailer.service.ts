import { Injectable } from '@nestjs/common';
import { transporter } from 'config/mailer.config';
import { UserWelcomeDto } from './dto/user-welcome.dtos';
import { welcomeTemplate } from './templates/welcome.template';
import { UserDonationDto } from './dto/user-donation.dtos';
import { donationTemplate } from './templates/donation.template';
import { mailOptions } from './options/mail-option';
import { eventTemplate } from './templates/event.template';
import { UserJoininEventDto } from './dto/user-joinin-event.dtos';
import { UserLeaveEventDto } from './dto/user-leave-event.dtos';
import { leaveEventTemplate } from './templates/leaveEvent.templante';
import { User } from 'src/users/entities/user.entity';
import { changePasswordTemplate } from './templates/changePassword.template';
import { UserChangePasswordDto } from './dto/user-change-password.dtos';
@Injectable()
export class MailerService {
  async sendEmailWelcome(userWelcomeDto: UserWelcomeDto) {
    try {
      const subject = 'Bienvenido al Movimiento Juvenil Peregrinos';
      const template = welcomeTemplate(userWelcomeDto.name);
      const mail = mailOptions(userWelcomeDto, subject, template);
      await transporter.sendMail(mail);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendEmailDonation(userDonationDto: UserDonationDto) {
    try {
      const subject = '!Gracias por tu donación!';
      const template = donationTemplate({
        name: userDonationDto.name,
        amount: userDonationDto.amount,
      });
      const mail = mailOptions(userDonationDto, subject, template);
      await transporter.sendMail(mail);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMailJoininEvent(userJoininEventDto: UserJoininEventDto) {
    try {
      const subject = '!Te has unido a un evento!';
      const template = eventTemplate({
        name: userJoininEventDto.name,
        title: userJoininEventDto.title,
        eventDate: userJoininEventDto.eventDate,
        eventLocation: userJoininEventDto.eventLocation,
      });
      const mail = mailOptions(userJoininEventDto, subject, template);
      await transporter.sendMail(mail);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMailLeaveEvent(userleaveEventDto: UserLeaveEventDto) {
    try {
      const subject = '!Te has salido de un evento!';
      const template = leaveEventTemplate({
        name: userleaveEventDto.name,
        title: userleaveEventDto.title,
        eventDate: userleaveEventDto.eventDate,
        eventLocation: userleaveEventDto.eventLocation,
      });
      const mail = mailOptions(userleaveEventDto, subject, template);
      await transporter.sendMail(mail);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendEmailChangePasswordRequest(userChangePasswordDto: UserChangePasswordDto) {
    try {
      const subject = 'Has sido solicitado un cambio de contraseña';
      const template = changePasswordTemplate({
        name: userChangePasswordDto.name,
        email: userChangePasswordDto.email,
        token: userChangePasswordDto.token
      });
      const mail = mailOptions(userChangePasswordDto, subject, template);
      await transporter.sendMail(mail);
      return { status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
