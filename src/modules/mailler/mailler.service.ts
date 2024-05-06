import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as argon from 'argon2';
import * as ejs from 'ejs';
import * as fs from 'fs';
import { UserService } from '../users/users.service';
import { log } from 'console';

@Injectable()
export class MaillerService {
  private readonly transporter: any; 
  constructor(private userService: UserService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'Gmail',
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'phamquanghao290@gmail.com',
        pass: 'qopptvaasgknwmtx',
      },
    });
  }

  async checkMailForgotPassword(to: string) {
    const check = await this.userService.getOneUserByEmail(to);
    return check;
  }

  async sendMailForgotPassword(to: string, subject: string) {
    // check xem email có tồn tại trong hệ thống hay chưa
    // Đọc template EJS tự file
    const template = fs.readFileSync('src/templates/send-mail.ejs', 'utf-8');
    // Render template với dữ liệu từ formData
    const html = ejs.render(template);
    const mailOptions = {
      from: 'RikkeiCV@gmail.com',
      to: to,
      subject: 'Forgot Password',
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }

  // async updatePassword(email: string, password: string): Promise<any> {
  //   const hashPassword = await argon.hash(password);
  //   const newUser = {
  //     email,
  //     password: hashPassword,
  //   }
  //   return await this.userService.update(newUser);
  // }
}
