import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/users.model';
@Injectable()
export class MailsService {
  constructor(
    private mailerService: MailerService,
    @InjectModel('User') private UserModel: Model<User>,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:4000/mail/confirm?token=${token}&username=${user.username}`; //url de redirection vers le site

    await this.mailerService.sendMail({
      to: user.email,
      from: '"Autorate Team" <autorate@app.com>', // override default from
      subject: 'Welcome to AutoRate App! Confirm your Email',
      template: 'src/mails/templates/confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        username: user.username,
        url,
      },
    });
    console.log(this.mailerService.sendMail);
  }

  async confirmEmail(token: string, username: string) {
    if (token) {
      const user = await this.UserModel.findOne({ username: username });
      if (user.mailConfirmed != true) {
        user.mailConfirmed = true;
        console.log('Mail confirmed ' + user);
        user.save();
        return {
          statusCode: HttpStatus.OK,
          message: 'User confirmed successfully',
          user,
        };
      }
    }
  }

  async BillMail(priv: number, professional: number, username: string) {
    const user = await this.UserModel.findOne({ username: username });


        await this.mailerService.sendMail({
            to: user.email,
            from: '"Autorate Team" <Autorate@app.com>', // override default from
            subject: 'Summary Rate',
            template: 'src/mails/templates/rate', // `.hbs` extension is appended automatically
            context: {
            // ✏️ filling curly brackets with content
            username,
            priv,
            professional
            },
        })
        
        return {
            statusCode: HttpStatus.OK,
            message: 'Bill Mail Send'
        }
  }

  async Message(message: string, sellor: string, buyer: string) {
    const user = await this.UserModel.findOne({ username: sellor })

    const user2 = await this.UserModel.findOne({ username: buyer})

    await this.mailerService.sendMail({
      to: user.email,
      from: user2.email, // override default from
      subject: 'Message',
      template: 'src/mails/templates/message', // `.hbs` extension is appended automatically
      context: {
      // ✏️ filling curly brackets with content
      message
      },
    })
  
    return {
        statusCode: HttpStatus.OK,
        message: 'Mail Send'
    }
  }
}
