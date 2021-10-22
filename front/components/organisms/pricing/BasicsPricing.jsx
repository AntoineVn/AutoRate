import { useState } from "react/cjs/react.development"
import useLocalStorage from "../../../hooks/uselocalstorage";
import { BackspaceIcon, CheckCircleIcon, RefreshIcon, SearchCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import BlueButton from "../../atoms/button/BlueButton";

function BasicsPricing() {
    const router = useRouter();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const now = yyyy + "-" + mm + "-" + dd;

    const LocalStorage = useLocalStorage;

    const [err, setErr] = useState("");
    const [wrong, setWrong] = useState("");
    const [form, setForm] = useState(true)
    const [result, setResult] = useState(false)
    const [search, setSearch] = useState(false)

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const [priv, setPrivate] = useState(0)
    const [professional, setProfessional] = useState(0)

    const [description, setDescription] = useState("")
    const [km, setKm] = useState(0)
    const [release, setRelease] = useState("")
    const [fuel, setFuel] = useState("Diesel")
    const [transmission, setTransmission] = useState("Manual")
    const [ref_country, setRefCountry] = useState("FR")

    const clear = (e) => {
        e.preventDefault()
        setDescription("")
        setKm(0)
        setRelease("")
        setFuel("Diesel")
        setTransmission("Manual")
        setRefCountry("FR")
        setWrong("")
    }
  
    const basics = async (e) => {
        e.preventDefault()

        setSearch(true)

        const back_url = "http://localhost:4000/autovisual/pricing_normal?roles=" + roles

        const request = new Request(
            back_url,
            {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                txt: description,
                km: km,
                dt_entry_service: release,
                fuel: fuel,
                transmission: transmission,
                country_ref: ref_country
            })
            }
        )

        const res = await fetch(request)
        const info = await res.json()
        
        if (info.statusCode == 400) {
            setWrong(info.error)
            setSearch(false)
        }
        else if(info.statusCode == 200) {
            console.log(info.data.value)
            const pri = info.data.value.c
            const pro = info.data.value.b
            setPrivate(info.data.value.c)
            setProfessional(info.data.value.b)
            setForm(false)
            setResult(true)
            setSearch(false)
            
            
            const mail_url = "http://localhost:4000/mail"

            const mail = new Request(mail_url, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    priv: pri,
                    professional: pro,
                    username: username
                })
              }
            )
  
            const res = await fetch(mail)
            const response = await res.json()
            console.log(response)

            const pricing = new Request(
              "http://localhost:4000/users/" + userId + "?role=" + roles,
              {
                method: "PATCH",
                headers: {
                  Authorization: "Bearer " + token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pricing: {
                    priv: pri,
                    professional: pro,
                    description: description,
                    date: now,
                    price: 5,
                    formula: "Basics"
                  },
                }),
              }
            );

            const res_pricing = await fetch(pricing);
            const data_pricing = await res_pricing.json();
            console.log(data_pricing)
        }
    }


    return (
        <div>

            { form == false && result == true && (
              <div className="w-1/2 ml-auto mr-auto pt-40">
                  <div className="flex flex-col  p-10 m-10 rounded border-8 border-gray-400 bg-white">
                      <div className="flex justify-center space-x-2 mb-5">
                          <CheckCircleIcon className="h-10 stroke-current text-green-500" />
                          <h1 className="text-3xl text-black te">
                              Results
                          </h1>
                      </div>
                      <p className="text-black text-xl text-center">
                        Appreciation of the value of your vehicle, at market prices.
                      </p>
                      <div className="flex justify-evenly my-5">
                        <div className="flex flex-col">
                          <div>
                            <label className="text-xl text-black">Private seller</label>
                          </div>

                          <div>
                            <p className="text-xl text-black">{priv} €</p>
                          </div>
                        </div>

                        <div className="flex flex-col">
                          <div>
                            <label className="text-xl text-black">Professional Seller</label>
                          </div>

                          <div>
                            <p className="text-xl text-black">{professional} €</p>
                          </div>

                        </div>

                      </div>

                      <div className="flex justify-evenly">
                        <div>
                          <BlueButton title="Back to Home" redirect="/"/>
                        </div>
                        
                        <div>
                          <BlueButton title="Back to Profile" redirect="/profile"/>
                        </div>
                        
                      </div>
                      
                  </div>
              </div>
            )}

           { form == true && result == false && (
              <div>
                <form className="mt-10">
                  <div className="flex flex-col rounded border-8 border-gray-400 items-center mr-auto ml-auto mt-5 bg-white w-1/4">
                      
                      <div className="border-b-4 w-3/4 text-center text-black text-3xl font-bold my-5 ">
                          <p>Car Information</p>
                      </div>
                          
                      <label className="text-xl font-bold text-black">Description</label>
                      <textarea className="h-auto text-black  text-center outline-none border-2 rounded my-2 w-60"
                                value={description} onChange={(e) => setDescription(e.target.value)}
                                name="description" id="description" cols="30" rows="10" 
                                placeholder="All the information concerning the vehicle: car brand, model, generation, 
                                finish, etc ... the more information you provide, the more precise the reconciliation will be. 
                                The first words are more important than the following ones, try to prioritize the information.">
                      </textarea> 
                     

                      <label className="text-xl font-bold text-black"  >Mileage</label>    
                      <input
                      className="h-10 text-black text-center outline-none border-2 rounded my-2 w-60" type="number"  value={km} onChange={(e) => setKm(e.target.valueAsNumber)}
                      ></input>

                      <label className="text-xl font-bold text-black">Release Date</label>    
                      <input
                      className="h-10 text-black border-2 text-center outline-none rounded my-2 w-60" type="date" value={release} onChange={(e) => setRelease(e.target.value)}
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
                      
                      { wrong != "" && (
                        <div className="text-center">
                          <label className="text-red-600 text-xl">{wrong}</label>
                        </div>
                      )}
                      
                      <div className="flex justify-evenly">
                            <div>
                                <button onClick={basics} className="flex rounded py-2 px-4 text-xl bg-black mx-10 my-4">Rate  <SearchCircleIcon className="h-8 mx-2"/> </button>             
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

            )} 
        </div>
    )
}

export default BasicsPricing
