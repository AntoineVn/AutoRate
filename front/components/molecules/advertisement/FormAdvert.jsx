import { PlusCircleIcon, RefreshIcon, BackspaceIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router';
import React from 'react'
import { useState } from "react/cjs/react.development"
import useLocalStorage from "../../../hooks/uselocalstorage";
import BlueButton from '../../atoms/button/BlueButton';

function FormAdvert() {
    const router = useRouter();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const now = yyyy + "-" + mm + "-" + dd;

    const LocalStorage = useLocalStorage;
    
    const [search, setSearch] = useState(false)

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const [date, setDate] = useState(now)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [km, setKm] = useState(0)
    const [brand, setBrand] = useState("")
    const [modelCar, setModelCar] = useState("")
    const [release, setRelease] = useState("")
    const [fuel, setFuel] = useState("Diesel")
    const [transmission, setTransmission] = useState("Manual")
    const [ref_country, setRefCountry] = useState("FR")

    const clear = (e) => {
        e.preventDefault()
        setDescription("")
        setKm(0)
        setPrice(0)
        setRelease("")
        setFuel("Diesel")
        setTransmission("Manual")
        setRefCountry("FR")
        setWrong("")
    }

    const add = async (e) => {
        e.preventDefault()

        setSearch(true)

        const back_url = "http://localhost:4000/advert?role=" + roles

        const request = new Request(back_url, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: description,
                author: username,
                date: date,
                price: price,
                brand: brand,
                modelCar: modelCar,
                km: km,
                release: release,
                fuel: fuel,
                transmission: transmission,
                ref: ref_country
            })
        })

        const res = await fetch(request)
        const rep = await res.json()
        console.log(rep)
        setSearch(false)
        router.push("/advertisement")
    }

    return (
        <div>
            <form className="mt-10">
                  <div className="flex flex-col rounded border-8 border-gray-400 items-center mr-auto ml-auto mt-5 bg-white w-1/4">
                      
                      <div className="border-b-4 w-3/4 text-center text-black text-3xl font-bold my-5 ">
                          <p>Car Information</p>
                      </div>
                          
                      <label className="text-xl font-bold text-black">Title of the Advertisement</label>
                      <textarea className="h-auto text-black  text-center outline-none border-2 rounded my-2 w-60"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                name="description" id="description" cols="30" rows="10" 
                                placeholder="All the information concerning the vehicle: car brand, model, generation, 
                                finish, etc ... the more information you provide, the more precise the reconciliation will be. 
                                The first words are more important than the following ones, try to prioritize the information.">
                      </textarea> 
                     
                    

                      <label className="text-xl font-bold text-black">Brand</label>    
                      <input
                      className="h-10 text-black border-2 text-center outline-none rounded my-2 w-60" value={brand} onChange={(e) => setBrand(e.target.value)}
                      ></input>

                    <label className="text-xl font-bold text-black">Model of the Car</label>    
                        <input
                      className="h-10 text-black border-2 text-center outline-none rounded my-2 w-60" value={modelCar} onChange={(e) => setModelCar(e.target.value)}
                    ></input>



                    <label className="text-xl font-bold text-black">Release Date</label>    
                      <input
                      className="h-10 text-black border-2 text-center outline-none rounded my-2 w-60" type="date" value={release} onChange={(e) => setRelease(e.target.value)}
                      ></input>

                      <label className="text-xl font-bold text-black"  >Mileage</label>    
                      <input
                      className="h-10 text-black text-center outline-none border-2 rounded my-2 w-60" type="number"  value={km} onChange={(e) => setKm(e.target.valueAsNumber)}
                      ></input>
                      
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

                      <label className="text-xl font-bold text-black"  >Price</label>    
                      <input
                      className="h-10 text-black text-center outline-none border-2 rounded my-2 w-60" type="number"  value={price} onChange={(e) => setPrice(e.target.valueAsNumber)}
                      ></input>
                      
                      <div className="flex justify-evenly">
                            <div>
                                <button onClick={add} className="flex rounded py-2 px-4 text-xl bg-black mx-10 my-4">Add  <PlusCircleIcon className="h-8 mx-2"/> </button>             
                            </div>

                            { search == true &&(
                                <div>
                                    <RefreshIcon className="animate-spin stroke-current text-black mt-8 h-8 mx-3" />
                                </div>
                            )}
                          
                            <div>
                                <button onClick={clear} className="flex py-2 px-4 rounded text-xl bg-black mx-10 my-4">Clear <BackspaceIcon className="h-8 mx-2"/> </button>
                            </div>
                              
                      </div>
                      
                  </div>
                
                </form>
        </div>
    )
}

export default FormAdvert
