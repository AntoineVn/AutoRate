import { useRouter } from 'next/router'
import React from 'react'
import { forwardRef } from 'react/cjs/react.development'
import BlueButton from '../button/BlueButton'

const Annonce = forwardRef(({advert}, ref) => {
    console.log("annonce",advert)

    const router = useRouter()

    const details = () => {
        router.push(`advertisement/${advert.id}`)
    }

    return (
        <div ref={ref} className="w-3/5 h-40 shadow-inner bg-white mr-auto ml-auto my-10 rounded-l-lg rounded-r-lg grid grid-cols-4" >
            
            <div className="text-center text-black text-2xl  rounded-l-lg flex flex-col items-center justify-center">
            <p className="text-2xl font-bold ">Description</p> 
                {advert.description}
            </div>

            <div className="text-center text-black text-xl  rounded-l-lg flex flex-col items-center justify-center">
            <p className="text-2xl font-bold ">Mileage</p> 
                {advert.km} km
            </div>
            
            <div className="text-center text-black text-2xl  rounded-l-lg flex flex-col items-center justify-center">
            <p className="text-2xl font-bold ">Price</p> 
                {advert.price} €
            </div>

            <div className="text-center pt-16">
                <button className="bg-blue-500 hover:bg-blue-700 mb-4 border text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline" onClick={details}>
                    More Details
                </button>
            </div>
            
        </div>
    )
})

export default Annonce
