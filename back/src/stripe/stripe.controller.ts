import {
    Controller,
    Post,
    Body
} from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('Stripe')
export class StripeController {
constructor(private stripeService: StripeService) {}


@Post()
async createCustomer(
    @Body('username') userUsername: string,
    @Body('email') userEmail: string,
) {
    const StripeId = await this.stripeService.getStripeId(userUsername, userEmail)
    return StripeId;
}

@Post('pm')
async createPM(
    @Body('paymentId') paymentId: string,
    @Body('customerId') customerId: string
) {
    const res = await this.stripeService.attachPaymentMethod(paymentId, customerId)
    return res
}

@Post("paymentIntent")
async paymentIntent(
    @Body('amount') amount: number,
    @Body('paymentMethod') paymentMethod: string,
    @Body('customerId') customerId: string,
    @Body('description') description: string
    ) {
    const res = await this.stripeService.paymentIntent(amount, paymentMethod, customerId, description)
    return res
}

@Post("paymentConfirm")
async paymentConfirm(
    @Body('paymentMethod') paymentMethod: string,
    @Body('paymentIntent') paymentIntent: string,
){
    const res = await this.stripeService.paymentConfirm(paymentMethod, paymentIntent)
    return res
}

}