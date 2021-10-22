import {
    Controller,
    Post,
    Get,
    Req,
    Request,
    UseGuards,
    Param,
    Body,
    Redirect,
    HttpStatus,
  } from '@nestjs/common';
  import { MailsService } from './mails.service';
  
  @Controller('mail')
  export class MailsController {
    constructor(private mailService: MailsService) {}
  
    @Get('confirm')
    @Redirect('http://localhost:3000/auth/login')
    async confirmMail(@Request() req) {
      console.log(req.query.token + ' ' + req.query.username);
      return this.mailService.confirmEmail(req.query.token, req.query.username);
    }
  
    @Get()
    async getMail() {
      console.log('mail ');
      return;
    }

    @Post()
    async sendBill(
        @Body('priv') priv: number,
        @Body('professional') professional: number,
        @Body('username') username: string

    ) {
        const result = await this.mailService.BillMail(
            priv,
            professional,
            username
        )
        return result
    }

    @Post('message')
    async sendMessage(
        @Body('message') message: string,
        @Body('buyer') buyer: string,
        @Body('sellor') sellor: string,
    ) {
        const result = await this.mailService.Message(
            message,
            sellor,
            buyer
        )
        return result
    }

  }
  