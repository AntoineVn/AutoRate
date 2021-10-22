import React from 'react'
import { useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../../../hooks/uselocalstorage";
import { PencilAltIcon } from "@heroicons/react/outline";

function ModalEdit({advert}) {

    const LocalStorage = useLocalStorage    

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [km, setKm] = useState(0)
    const [brand, setBrand] = useState("")
    const [modelCar, setModelCar] = useState("")
    const [release, setRelease] = useState("")
    const [fuel, setFuel] = useState("Diesel")
    const [transmission, setTransmission] = useState("Manual")
    const [ref_country, setRefCountry] = useState("FR")

    const router = useRouter();

    const [ open, setOpen ] = useState(false)

    const edit = async (e) => {
        e.preventDefault();

        const patch_advert = new Request(
            "http://localhost:4000/advert/" + advert.id + "?role=" + roles,
            {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                description: description,
                author: username,
                price: price,
                brand: brand,
                modelCar: modelCar,
                km: km,
                release: release,
                fuel: fuel,
                transmission: transmission,
                ref: ref_country
            }),
            }
        )

        const res = await fetch(patch_advert)
        const data = await res.json()
        console.log(data)
        router.push(`/advertisement/${advert.id}`);
        setOpen(false)
    };

    const openModal = () => {
        setOpen(true);
    };

    const close = () => {
        setOpen(false)
        console.log("close")
    } 

    return (
        <div>
        {open == false && (
            <div className="flex items-center cursor-pointer"
            onClick={openModal}>
            <div className="transition duration-100 
            transform hover:scale-105 stroke-current text-red-600 pt-8">
            < PencilAltIcon className="h-8" />
            <p className="text-2xl font-normal">
                Edit
            </p>
            </div>
        </div>
        )}
        
        

        {open== true &&  (
            <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-sm">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl text-black font-semibold">Edit</h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={close}
                    >
                        X
                    </button>
                    </div>
                    {/*body*/}
                    <div className="flex flex-col items-center text-center">
                        <form className="" onSubmit={edit}>

                            <div className="text-black text-2xl text-start font-bold mt-5"> 
                                <label>Description</label>                             
                            </div>

                            <div>
                                <input className="h-10 required text-black text-center border-2 outline-none rounded my-2 w-60" placeholder={advert.description} onChange={(e) => setDescription(e.target.value)}></input>
                            </div>

                            <div className="text-black text-2xl text-start font-bold">
                                <label>Brand</label>
                            </div>

                            <div>
                                <input className="h-10 required text-black text-center border-2 outline-none rounded my-2 w-60" placeholder={advert.brand} onChange={(e) => setBrand(e.target.value)}></input>
                            </div>
                            
                            <div>
                                <label className="text-black text-2xl text-start font-bold mt-5">Model</label>    
                            </div>

                            <div>
                                <input
                                className="h-10 required text-black text-center border-2 outline-none rounded my-2 w-60" placeholder={advert.modelCar} onChange={(e) => setModelCar(e.target.value)}
                                ></input>
                            </div>
                            
                            <div>
                                <label className="text-black text-2xl text-start font-bold mt-5">Mileage</label>
                            </div>
                            <div>    
                                <input
                                className="h-10 required text-black border-2 text-center outline-none rounded my-2 w-60" type="number" placeholder={advert.km} min={0} onChange={(e) => setKm(e.target.valueAsNumber)}
                                ></input>
                            </div>
                            
                            <div className="flex flex-col items-center my-2">
                                <label className="text-xl font-bold text-black">Fuel</label>    
                                <select className="w-60 h-10 text-center text-xl text-black outline-none bg-white border-2 rounded" value={fuel} onChange={(e) => setFuel(e.target.value)}>
                                    <option selected value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="Ethanol">Ethanol</option>
                                    <option value="LPG">LPG</option>
                                    <option value="Hybrid">Hybrid</option>

                                </select>
                            </div>
                        
                            <div className="flex flex-col items-center">
                                <label className="text-xl font-bold text-black">Transmission</label>    
                                <select className="w-60 h-10 text-center text-xl text-black outline-none bg-gray-100 my-2" value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                                    
                                    <option selected value="Manual">Manual</option>
                                    <option value="Automatic">Automatic</option>
                                    
                                </select>
                            </div>

                            <div className="flex flex-col items-center">
                                <label className="text-xl font-bold text-black">Country Reference</label>    
                                <select className="w-60 h-10 text-center text-xl text-black outline-none bg-gray-100 my-2" value={ref_country} onChange={(e) => setRefCountry(e.target.value)}>
                                    
                                    <option selected value="FR">France</option>
                                    <option value="DE">Germany</option>
                                    <option value="ES">Spain</option>
                                    <option value="BE">Belgium</option>
                                    <option value="AT">Austria</option>
                                    <option value="PT">Portugal</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="RO">Romania</option>
                                    <option value="PL">Poland</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="IE">Ireland</option>
                                    <option value="DK">Denmark</option>
                                    <option value="HR">Croatia</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="SE">Sweden</option>
                                    
                                </select>
                            </div>

                            <div>
                                <label className="text-black text-2xl text-start font-bold mt-5">Release Date</label>
                            </div>
                            <div>    
                                <input
                                className="h-10 required text-black border-2 text-center outline-none rounded my-2 w-60" type="date" placeholder={advert.release} onChange={(e) => setRelease(e.target.value)}
                                ></input>
                            </div>

                            <div>
                                <label className="text-black text-2xl text-start font-bold mt-5">Price</label>
                            </div>
                            <div>    
                                <input
                                className="h-10 required text-black border-2 text-center outline-none rounded my-2 w-60" type="number" placeholder={advert.price} min={0} onChange={(e) => setPrice(e.target.valueAsNumber)}
                                ></input>
                            </div>

                        </form>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-evenly p-6 border-t border-solid border-blueGray-200 rounded-b mt-5">
                    <button
                        className="font-bold uppercase text-red-600 border-gray-300 border text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={close}
                    >
                        Close
                    </button>
                    <button
                        className="font-bold uppercase text-black  text-sm px-6 py-3 rounded border-gray-300 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={edit}
                    >
                        Save Changes
                    </button>
                    </div>
                </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
        )}
        </div>
    )
}

export default ModalEdit
