import React from 'react'
import BlueButton from '../atoms/button/BlueButton'

function Bandeau() {
    return (
        <div>
            <div className="w-full bg-white h-screen bg-cover bg-no-repeat" style={{
                backgroundImage: `url("https://w0.peakpx.com/wallpaper/354/235/HD-wallpaper-cars-on-road-between-buildings-dark-aesthetic.jpg")`
            }}>
                <h1 className="text-center text-white text-9xl pt-28">Welcome to Autorate</h1>
            </div>

            <div className="grid grid-cols-2 mt-4 gap-1">

                <div className="h-screen bg-contain bg-no-repeat bg-center bg-gray-100" style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1493238792000-8113da705763?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80")`
                }}>

                </div>

                <div className="h-screen bg-gray-100">
                    <div className="grid  justify-items-center">

                        <div className="mt-40">
                           <h1 className="text-center text-black text-7xl">
                                Pricing
                            </h1> 
                        </div>
                        
                        <div className="mt-20">
                          <h1 className="text-center text-black text-4xl mt-5">
                                Our Website rate the car at the nearest market price. Moreover this service is fast and reliable !
                                The last service that we have developped allow to price a specific date.
                            </h1>  
                        </div>

                        <div className="mt-40   ">
                            <BlueButton title="Try the Pricing" redirect="pricing"/>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="h-screen bg-gray-100">
                    <div className="grid  justify-items-center">

                        <div className="mt-40">
                           <h1 className="text-center text-black text-7xl">
                                Advertisement
                            </h1> 
                        </div>
                        
                        <div className="mt-20">
                          <h1 className="text-center text-black text-4xl mt-5">
                                Our site also offerts to place advertisements for individual sellor and equally professionaly.
                                We provide the necessary means to contact the sellor. 
                            </h1>  
                        </div>

                        <div className="mt-40   ">
                            <BlueButton title="Deposit a advertisement" redirect="advertisement"/>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="bg-contain bg-no-repeat bg-center h-screen bg-gray-100" style={{
                    backgroundImage: `url("https://www.neubauer.fr/contents/uploads/2019/08/background-multi-brands-neubauer.jpg")`
                }}>

                </div>

            </div>
        </div>
        
    )
}

export default Bandeau
