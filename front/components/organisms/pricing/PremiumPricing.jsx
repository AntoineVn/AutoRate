import { useState } from "react/cjs/react.development"
import { loadStripe } from "@stripe/stripe-js";
import useLocalStorage from "../../../hooks/uselocalstorage";
import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { BackspaceIcon, CheckCircleIcon, RefreshIcon, SearchCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import BlueButton from "../../atoms/button/BlueButton";


const CheckoutForm = () => {
    const router = useRouter();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const now = yyyy + "-" + mm + "-" + dd;


    const LocalStorage = useLocalStorage;

    const stripe = useStripe();
    const elements = useElements();
    
    const [err, setErr] = useState("");
    const [wrong, setWrong] = useState("");
    const [loading, setLoading] = useState(false);
    const [recap, setRecap] = useState(false);
    const [form, setForm] = useState(false)
    const [result, setResult] = useState(false)
    const [search, setSearch] = useState(false)

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const [pi, setPiId] = useState("");
    const [pm, setPmId] = useState("");

    const [priv, setPrivate] = useState(0)
    const [professional, setProfessional] = useState(0)

    const [description, setDescription] = useState("")
    const [km, setKm] = useState(0)
    const [release, setRelease] = useState("")
    const [fuel, setFuel] = useState("Diesel")
    const [transmission, setTransmission] = useState("Manual")
    const [ref_country, setRefCountry] = useState("FR")
    const [date, setDate] = useState(now)

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setLoading(true);
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);
    
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
    
        if (error) {
          console.log("[error]", error);
          setErr(error.message);
          setLoading(false);
        } else {
          console.log("[PaymentMethod]", paymentMethod);
    
          const pmId = paymentMethod.id;
    
          const data_user = new Request("http://localhost:4000/users/" + userId, {
            method: "GET",
          });
    
          const res = await fetch(data_user);
          //console.log(res.status)
    
          if (res.status == 200) {
            const data = await res.json();    
            const cmId = data.stripeId;
    
            const attach = new Request("http://localhost:4000/stripe/pm", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                paymentId: pmId,
                customerId: cmId,
              }),
            });
    
            const res_pm = await fetch(attach);
    
            if (res_pm.status == 201) {
              const data_pm = await res_pm.text();
              //console.log(data_pm)
              setPmId(data_pm);
    
              
    
                const payment_intent = new Request(
                  "http://localhost:4000/stripe/paymentIntent",
                  {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      amount: 500,
                      paymentMethod: pmId,
                      customerId: cmId,
                      description: "Premium Pricing",
                    }),
                  }
                );
    
                const res_pi = await fetch(payment_intent);
                console.log(res_pi.status);
      
                if (res_pi.status == 201) {
                  const data_pi = await res_pi.text();
                  //console.log(data_pi)
                  setPiId(data_pi);
                  setRecap(true);
                  setLoading(false);
                }
            }
          }
        }
      };
    
      const confirmOrder = async (e) => {
        const confirmIntent = new Request(
          "http://localhost:4000/stripe/paymentConfirm",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethod: pm,
              paymentIntent: pi,
            }),
          }
        );
    
        const res = await fetch(confirmIntent);
        const response = await res.json();
        console.log("reçu:", response.charges.data[0].receipt_url);
    
        if (response.status == "succeeded") {
          
    
          
            const invoices = new Request(
              "http://localhost:4000/users/" + userId + "?role=" + roles,
              {
                method: "PATCH",
                headers: {
                  Authorization: "Bearer " + token,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  invoices: {
                    bill: response.charges.data[0].receipt_url,
                    amount: response.amount / 100,
                    date: now,
                  },
                }),
              }
            );
      
            const res_invoices = await fetch(invoices);
            const data_invoices = await res_invoices.json();
            setForm(true)
            setRecap(false)
            console.log(data_invoices);
    
        }
      };

    const clear = (e) => {
      e.preventDefault()
      setDescription("")
      setKm(0)
      setRelease("")
      setDate(now)
      setFuel("Diesel")
      setTransmission("Manual")
      setRefCountry("France")
      setWrong("")
    }

    const premium = async (e) => {
      e.preventDefault()

      setSearch(true)
      const back_url = "http://localhost:4000/autovisual/pricing_vip?roles=" + roles

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
            country_ref: ref_country,
            dt_valuation: date
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
                formula: "Premium"
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

            { form == false && recap == false && result == true && (
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


            { form == true && recap == false && result == false && (
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

                      <label className="text-xl font-bold text-black">Prediction date</label>    
                        <input
                        className="h-10 text-black border-2 text-center outline-none rounded my-2 w-60" type="date" value={date} min={now} onChange={(e) => setDate(e.target.value)}
                        ></input>
                      
                      { wrong != "" && (
                        <div className="text-center">
                          <label className="text-red-600 text-xl">{wrong}</label>
                        </div>
                      )}
                      
                      <div className="flex justify-evenly">
                          
                            <div>
                                <button onClick={premium} className="flex rounded py-2 px-4 text-xl bg-black mx-10 my-4">Rate  <SearchCircleIcon className="h-8 mx-2"/> </button>             
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

            {recap == false && form == false && result == false && (
                <div className="w-2/5 bg-gray-100 ml-auto mr-auto p-5 mt-40 text-black rounded border-8 border-gray-400">
                    <label className="text-3xl font-bold pb-5">Payment Information</label>
        
                    <p className="mt-3 text-red-600 font-bold text-lg">{err}</p>
                    
                    <form className="mb-3" onSubmit={handleSubmit}>
                        <CardElement
                            className="bg-gray-200 rounded border-4 p-5"
                            options={{
                            style: {
                                base: {
                                fontSize: "20px",
                                    color: "#000000",
                                "::placeholder": {
                                    color: "#67706E",
                                },
                                },
                                invalid: {
                                color: "##ff0202",
                                },
                            },
                            }}
                            onChange={() => setErr("")}
                        />
                        <div className="flex justify-evenly">
                            <button
                            className="bg-blue-500 hover:bg-blue-700 mt-6
                                            border text-white font-bold py-2 px-4 
                                            rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={!stripe}
                            >
                            Confirm
                            </button>
                            {loading == true && (
                            <div className="flex flex-row justify-items-center">
                                <div>
                                <RefreshIcon className="animate-spin mt-8 h-8 mx-3" />
                                </div>
                                <div>
                                <p className="mt-8 font-bold text-xl">Processing</p>
                                </div>
                            </div>
                            )}
                            <button
                            className="bg-blue-500 hover:bg-blue-700 mt-6
                            border text-white font-bold py-2 px-4 
                            rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={!stripe}
                            onClick={() => router.push("/pricing")}
                            >
                            Cancel
                            </button>
                            
                        </div>
                    </form>
                </div>
            )}

            {recap == true && form == false && result == false && (
                <div className="w-2/5 mt-40 bg-gray-100 ml-auto mr-auto rounded border-8 border-gray-400">
                <h1 className="text-center text-black text-bold text-3xl py-5 ">Your Order</h1>
      
                <div className="w-11/12 bg-white mr-auto ml-auto rounded border border-gray-300 mb-5">
                  <h1 className="text-black text-center text-xl mt-2 text-bold">Premium Pricing</h1>
      
                  <div className="flex flex-row justify-center mt-4 text-black">
                    <div>
                      <p>5€</p>
                    </div>
      
                  </div>
      
                  <div className="flex flex-row justify-evenly">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 mb-4 border 
                                          text-white font-bold py-2 px-4 rounded 
                                          focus:outline-none focus:shadow-outline mt-8"
                      onClick={confirmOrder}
                    >
                      Pay
                    </button>
      
                    <button
                      className="bg-blue-500 hover:bg-blue-700 mb-4 border 
                                          text-white font-bold py-2 px-4 rounded 
                                          focus:outline-none focus:shadow-outline mt-8"
                      onClick={() => {router.push("/pricing/premium"),setRecap(false)}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            
        </div>
         
    )
}

const stripePromise = loadStripe(
    "pk_test_51IiQQkLQnPqflYSnb4h9SaneWwN1qYskWSJrm4Tu56IND0oN8h1MtsknpgBS7ekai6iqiFBSMcABqnmcwwmibkoM00iqb8OTxh"
);

const PremiumPricing = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    );
  };
  

export default PremiumPricing
