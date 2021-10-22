import React from 'react'
import { useState } from 'react/cjs/react.development'
import useLocalStorage from '../../../hooks/uselocalstorage'
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';


function DescriptionAdvert({advert}) {

    const LocalStorage = useLocalStorage;

    const [email ,setEmail ] = useState(false)
    const [message, setMessage] = useState("")

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const sendMail = async (e) => {
        e.preventDefault()

        const back_url = "http://localhost:4000/mail/message"

        const request = new Request(back_url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                buyer: username,
                sellor: advert.author
            })
        })

        const res = await fetch(request)
        const rep = await res.json()
        console.log(rep)
        setEmail(false)
    }

    const cancel = () => {
        setEmail(false)
    }

    return (
        <div>
           {email == false && (
                <div className="w-3/4 mr-auto ml-auto bg-white rounded-xl border-8 border-gray-600">

                <div className="flex flex-row justify-evenly">

                    { advert.author == username && (
                        <ModalEdit advert={advert}/>
                    )}


                    <div className="text-center text-black text-4xl font-bold my-10">
                        {advert.description}
                    </div>

                    { advert.author == username && (
                        <ModalDelete  advert={advert}/>
                    )}

                </div>

                
    
                <div className="flex flex-row justify-evenly">
    
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Brand</p>
                        {advert.brand}
                    </div>
                
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Model</p>
                        {advert.modelCar}
                    </div>
    
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Mileage</p>
                            {advert.km} km
                    </div>
    
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Type Of Fuel</p>
                        {advert.fuel} 
                    </div>
    
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Type Of Transmission</p>
                        {advert.transmission} 
                    </div>
    
                    <div className="text-xl text-black">
                        <p className="text-2xl text-black font-bold">Release Date</p>
                        {advert.release} 
                    </div>
                    
                </div>
    
                <div className="text-center text-black text-xl my-10 flex flex-row justify-evenly">
                    <div>
                        <p className="text-2xl font-bold">Selling Price</p>
                    {advert.price} €
                    </div>
    
                    <div>
                        <button className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" onClick={() => setEmail(true)}>
                            Send a mail to the seller
                        </button>
                    </div>
                    
                </div>
    
                
            </div>
            )} 

            {email == true && (
                <div className="w-1/4 bg-white items-center flex flex-col ml-auto mr-auto rounded-xl border-8">

                    <div className="text-center text-black text-4xl font-bold my-5">
                        <p>Message</p>
                    </div>

                    <textarea className="h-auto text-black  text-center outline-none border-2 rounded my-2 w-60"
                            value={message} onChange={(e) => setMessage(e.target.value)}
                            name="description" id="description" cols="30" rows="10" 
                            >
                    </textarea>

                    <div className="flex flex-row justify-evenly">

                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" onClick={sendMail}>
                            Send
                            </button>
                        </div>

                        <div>
                            <button className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded 
                        focus:outline-none focus:shadow-outline" onClick={cancel}>
                            Cancel
                            </button>
                        </div>
                    </div>

                </div>
            )}
        </div> 
        
    )
}

export default DescriptionAdvert
