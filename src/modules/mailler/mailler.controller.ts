import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { MaillerService } from './mailler.service';
import  * as argon from 'argon2';
import { log } from 'console';

@Controller('api')
export class MaillerController {
  constructor(private readonly maillerService: MaillerService) {}

  @Post('send-mail')
  async sendMail(@Body() data: any, @Res() res: any) {
    const check = await this.maillerService.checkMailForgotPassword(data.to);
    if (check) {
      await this.maillerService.sendMailForgotPassword(data.to, data.subject);
      const token = await argon.hash(data.to);
      res.status(200).json({
        message: 'Vui lòng kiểm tra hộp thư điện tử của bạn',
        status: true,
        token,
      });
    } else {
      res.status(200).json({
        message: 'Email does not exist',
        status: false,
      });
    }
  }

  // @Post('forgot-password')
  // async newPassword(@Body() data: any, @Res() res: any) 
  // {
  //   const { token, email } = data;
  //   const tokenCheck = await argon.verify(token, email);
  //   if(tokenCheck) {
  //     const newPassword = await argon.hash(data.password);
  //     // lưu lại newPassword với database
  //     const user = await this.maillerService.updatePassword(email, newPassword);
  //   }else{
  //     res.status(200).json({
  //       message: 'Email does not exist',
  //       status: false,
  //     })
  //   }
  // }
}
