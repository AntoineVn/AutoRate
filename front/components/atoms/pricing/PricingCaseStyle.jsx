import BlueButton from "../button/BlueButton";

function PricingCaseStyle({title, options, redirect}) {
    return (
        <div className="bg-white shadow-md rounded border-8 border-gray-400 h-48 w-full mx-10">
            <h1 className="text-black text-center   text-3xl font-bold pt-3">
                {title}
            </h1>

            <p className="text-black text-center pt-5">
            {options}
            </p>

            <div className="pt-5" >
                <BlueButton title={title} redirect={redirect}/>
            </div>
            
        </div>
    )
}

export default PricingCaseStyle
