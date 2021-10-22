import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { AdvertService } from './advert.service';

@Controller('advert')
export class AdvertController {
    constructor(private readonly advertService: AdvertService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.Client)
    async addAdvert(
        @Body('description') advertDescription: string,
        @Body('date') advertDate: string,
        @Body('author') advertAuthor: string,
        @Body('brand') advertbrand: string,
        @Body('modelCar') advertModelCar: string,
        @Body('price') advertPrice: number,
        @Body('km') advertKm: number,
        @Body('release') advertRelease: string,
        @Body('fuel') advertFuel: string,
        @Body('transmission') advertTransmission: string,
        @Body('ref') advertRef: string
    ) {
        const advert = await this.advertService.insertAdvert(
            advertDescription,
            advertDate,
            advertAuthor,
            advertbrand,
            advertModelCar,
            advertPrice,
            advertKm,
            advertRelease,
            advertFuel,
            advertTransmission,
            advertRef
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'Advert added successfully',
            data: advert
        }
    }
    
    @Get()
    async getAllAdvert() {
        const adverts = await this.advertService.getAdverts()
        return adverts
    }

    @Get(':id')
    getAdvert(@Param('id') advertId: string) {
        return this.advertService.getSingleAdvert(advertId)
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Client, Role.Admin)
    async updateAdvert(
        @Param('id') advertId: string,
        @Body('description') advertDescription: string,
        @Body('brand') advertBrand: string,
        @Body('modelCar') advertModelCar: string,
        @Body('price') advertPrice: number,
        @Body('km') advertKm: number,
        @Body('release') advertRelease: string,
        @Body('fuel') advertFuel: string,
        @Body('transmission') advertTransmission: string,
        @Body('ref') advertRef: string
    ) {
        const advert = await this.advertService.updateAdvert(
            advertId,
            advertDescription,
            advertBrand,
            advertModelCar,
            advertPrice,
            advertKm,
            advertRelease,
            advertFuel,
            advertTransmission,
            advertRef
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'advert updated successfully',
            data: advert
        }
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.Admin, Role.Client)
    async removeAdvert(@Param('id') advertId:  string) {
        const isDeleted = await this.advertService.deleteAdvert(advertId)
        
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: 'advert deleted successfully'
            }
        }
    }
}
