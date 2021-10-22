
import { Injectable, HttpStatus } from '@nestjs/common';
import Stripe from 'stripe'

export class StripeService {

  async getStripeId(username: string, email:string){
    const fetch = require("node-fetch")
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", username);
    urlencoded.append("email", email);
    
    var requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + process.env.STRIPE_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"

      },
      body: urlencoded,
      redirect: 'follow'
    };
    
    var res = ""

     await fetch("https://api.stripe.com/v1/customers", requestOptions)
      .then(response => response.json())
      .then(result => {res=result.id, console.log("stripeId in stripeService", res)})
      .catch(error => console.log('error', error));
    return res.toString()
  }

  async paymentmethod_types(card, customerId){
    
    const stripe = require('stripe')(process.env.STRIPE_API_KEY);

    var pmId = ""

    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: card,
    })
    pmId = paymentMethod.id

    const res = await this.linkUserPaymentMethod(pmId, customerId)
    return res;
  }

  async attachPaymentMethod(paymentId, customerId) {
    const fetch = require("node-fetch")

    var urlencoded = new URLSearchParams();
    urlencoded.append("customer", customerId);

    var requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + process.env.STRIPE_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"

      },
      body: urlencoded,
    };

    var res = ""

    await fetch("https://api.stripe.com/v1/payment_methods/"+ paymentId +"/attach", requestOptions)
      .then(response => response.json())
      .then(result => {res=result.id})
      .catch(error => console.log('error', error));
    return res
  }

  async linkUserPaymentMethod(pmId, customerId){

    const fetch = require("node-fetch")

    var urlencoded = new URLSearchParams();
    urlencoded.append("customer", customerId);

    var requestOptions = {
      method: 'POST',
      headers: {
        "Authorization": "Bearer " + process.env.STRIPE_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded"

      },
      body: urlencoded,
    };

    var res = ""

    await fetch("https://api.stripe.com/v1/payment_methods/"+ pmId +"/attach", requestOptions)
      .then(response => response.json())
      .then(result => {res=result.id})
      .catch(error => console.log('error', error));
    return res
    }

    async paymentIntent(amount, paymentMethod, customerId, description){

      const fetch = require("node-fetch")

      var urlencoded = new URLSearchParams();
      urlencoded.append("amount", amount);
      urlencoded.append("currency", "eur");
      urlencoded.append("payment_method", paymentMethod);
      urlencoded.append("customer", customerId);
      urlencoded.append("description", description);

      var requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + process.env.STRIPE_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded"
  
        },
        body: urlencoded,
        redirect: 'follow'
      };

      var res = ""

      await fetch("https://api.stripe.com/v1/payment_intents", requestOptions)
        .then(response => response.json())
        .then(result => { res = result.id})
        .catch(error => console.log('error', error));
      return res
    }

    async paymentConfirm(paymentMethod, paymentIntent){
      const fetch = require("node-fetch")

      var urlencoded = new URLSearchParams();
      urlencoded.append("payment_method", paymentMethod);

      var requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + process.env.STRIPE_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded"
  
        },
        body: urlencoded,
        redirect: 'follow'
      };

      var res = ""
      await fetch("https://api.stripe.com/v1/payment_intents/"+ paymentIntent +"/confirm", requestOptions)
        .then(response => response.json())
        .then(result => {res =result,console.log(res)})
        .catch(error => console.log('error', error));
      return res
    } 
}
