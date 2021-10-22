import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AutovisualService {

    async normalPricing(
        txt: string,
        km: number,
        dt_entry_service: string,
        fuel: string,
        transmission: string,
        country_ref: string
    )   {

        const fetch = require("node-fetch")

        var requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: process.env.AUTOVISUAL_API_KEY,
                txt: txt,
                km: km,
                dt_entry_service: dt_entry_service,
                fuel: fuel,
                transmission: transmission,
                country_ref: country_ref,
                value: "true",
                transaction: "true",
                market: "true"
            }),
            redirect: 'follow'
        };
        
        const res = await fetch("https://api.autovisual.com/v2/av",requestOptions)
        console.log("httpstatus",res.status)

        if (res.status == 400) {
            const data = await res.json()
            console.log("data invalide",data)
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                error: data.error.title
                
            }
        }

        else if (res.status == 200) {
            const data = await res.json()
            console.log("data valide",data)
            return {
                statusCode: HttpStatus.OK,
                data
            }
        }
    }

    async vipPricing(
        txt: string,
        km: number,
        dt_entry_service: string,
        fuel: string,
        transmission: string,
        country_ref: string,
        dt_valuation: string
    )   {

        const fetch = require("node-fetch")

        var requestOptions = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                key: process.env.AUTOVISUAL_API_KEY,
                txt: txt,
                km: km,
                dt_entry_service: dt_entry_service,
                fuel: fuel,
                dt_valuation: dt_valuation,
                transmission: transmission,
                country_ref: country_ref,
                value: "true",
                transaction: "true",
                market: "true"
            }),
            redirect: 'follow'
        };

        const res = await fetch("https://api.autovisual.com/v2/av",requestOptions)
        console.log("httpstatus",res.status)

        if (res.status == 400) {
            const data = await res.json()
            console.log("data invalide",data)
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                error: data.error.title
                
            }
        }

        else if (res.status == 200) {
            const data = await res.json()
            console.log("data valide",data)
            return {
                statusCode: HttpStatus.OK,
                data
            }
        }
    }
}
