import { Controller,Post,Body } from '@nestjs/common';
import { AutovisualService } from './autovisual.service';

@Controller('autovisual')
export class AutovisualController {
    constructor(private autovisualService: AutovisualService) {}

    @Post("pricing_normal")
    async pricing(
        @Body('txt') txt: string,
        @Body('km') km: number,
        @Body('dt_entry_service') dt_entry_service: string,
        @Body('fuel') fuel: string,
        @Body('transmission') transmission:string,
        @Body('country_ref') country_ref:string
    ) {
        const price = await this.autovisualService.normalPricing(txt, km, dt_entry_service, fuel, transmission, country_ref)
        return price
    }

    @Post("pricing_vip")
    async vip(
        @Body('txt') txt: string,
        @Body('km') km: number,
        @Body('dt_entry_service') dt_entry_service: string,
        @Body('fuel') fuel: string,
        @Body('transmission') transmission:string,
        @Body('country_ref') country_ref:string,
        @Body('dt_valuation') dt_valuation: string
    ) {
        const price = await this.autovisualService.vipPricing(txt, km, dt_entry_service, fuel, transmission, country_ref, dt_valuation)
        return price
    }

}
