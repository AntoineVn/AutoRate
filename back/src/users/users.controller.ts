import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    HttpStatus,
    UseGuards,
    Req
  } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { StripeService } from 'src/stripe/stripe.service';

@Controller('users')
export class UsersController {
    
    constructor(
        private readonly usersService: UsersService,
        private readonly stripeService: StripeService,
    ) {}

    @Post()
    async addUser(
        @Body('username') userUsername: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
    ) {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(userPassword, salt); //Hash le password
        const stripeId = await this.stripeService.getStripeId(
        userUsername,
        userEmail,
        );

        const user = await this.usersService.insertUser(
        userUsername,
        userEmail,
        password,
        stripeId,
        );
        return {
        statusCode: HttpStatus.OK,
        message: 'user added successfully',
        data: user,
        };
    }

    @Get()
        async getAllusers() {
        const users = await this.usersService.getUsers();
        return users;
    }

    @Get(':id')
        async getuser(@Param('id') userId: string) {
        return this.usersService.getSingleUser(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.Client)
    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('username') userUsername: string,
        @Body('email') userEmail: string,
        @Body('mailConfirmed') userMailConfirmed: boolean,       
        @Body('password') userPassword: string,       
        @Body('invoices') userinvoices: any,
        @Body('roles') userRole: Role,
        @Body('stripeId') userStripeId: string,
        @Body('advert') userAdvert: any,
        @Body('pricing') userPricing: any
    ) {
        if (userPassword) {
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(userPassword, salt);

            const user = await this.usersService.updateUser(
                userId,
                userUsername,
                userEmail,
                userMailConfirmed,
                password,
                userinvoices,
                userRole,
                userStripeId,
                userAdvert,
                userPricing
                
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'user updated successfully',
                data: user,
            };
        } else {
            const user = await this.usersService.updateUser(
                userId,
                userUsername,
                userEmail,
                userMailConfirmed,
                userPassword,
                userinvoices,
                userRole,
                userStripeId,
                userAdvert,
                userPricing
            );
            return {
                statusCode: HttpStatus.OK,
                message: 'user updated successfully',
                user: user,
            };
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin || Role.Client)
    async deleteUser(@Param('id') userId: string) {
        const isDeleted = await this.usersService.deleteUser(userId);
        if (isDeleted) {
        return {
            statusCode: HttpStatus.OK,
            message: 'User deleted successfully',
        };
        }
    }
}
