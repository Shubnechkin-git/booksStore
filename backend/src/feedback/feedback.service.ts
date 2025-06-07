import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './feedback.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeedbackService {
  private transporter;

  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private configService: ConfigService, // внедри ConfigService
  ) {
    const mailHost = this.configService.get<string>('MAIL_HOST');
    const mailPort = Number(this.configService.get<string>('MAIL_PORT'));
    const mailUser = this.configService.get<string>('MAIL_USER');
    const mailPass = this.configService.get<string>('MAIL_PASS');

    Logger.log(`Setting up mail transporter: ${mailHost}:${mailPort}`);

    this.transporter = nodemailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: mailPort === 465, // если порт 465 — SSL, иначе false
      auth: {
        user: mailUser,
        pass: mailPass,
      },
    });
  }

  async sendFeedbackEmail(dto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create(dto);
    await this.feedbackRepository.save(feedback);

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'), // ваш email
      to: dto.email, // email клиента
      subject: 'Спасибо за обратную связь!',
      text: `Здравствуйте, ${dto.name}!\n\nСпасибо за ваш отзыв:\n${dto.message}`,
      html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd;">
    <h2 style="color: #2c3e50;">Здравствуйте, ${dto.name}!</h2>
    <p style="font-size: 16px; color: #34495e;">Спасибо за ваш отзыв. Мы очень ценим ваше мнение и обязательно его рассмотрим.</p>
    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
    <h3 style="color: #2980b9;">Ваше сообщение:</h3>
    <blockquote style="font-style: italic; color: #7f8c8d; padding-left: 15px; border-left: 4px solid #2980b9;">
      ${dto.message}
    </blockquote>
    <p style="font-size: 14px; color: #95a5a6;">Если у вас есть дополнительные вопросы, вы всегда можете написать нам на эту почту.</p>
    <p style="font-size: 14px; color: #95a5a6; margin-top: 30px;">С уважением,<br>Команда поддержки</p>
  </div>
  `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        message: 'Письмо успешно отправлено и заявка сохранена',
      };
    } catch (error) {
      Logger.error('Ошибка при отправке письма:', error);

      let userMessage = 'Не удалось отправить письмо';

      // Дополнительная обработка известных ошибок SMTP
      if (error && typeof error.message === 'string') {
        if (error.message.includes('550 Message was not accepted')) {
          userMessage =
            'Неверный email получателя или отправителя. Проверьте адрес.';
        }
      }

      return {
        success: false,
        message: userMessage,
        error: error.message || error.toString(),
      };
    }
  }
}
