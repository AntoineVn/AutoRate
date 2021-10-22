import PricingCase from "../../molecules/pricing/PricingCase";

function PricingChoice() {
    return (
        <div className="flex justify-evenly pt-40">

            <div>
                <PricingCase redirect="/pricing/basics" choice="Basics" text="Basics" options="Rate your car thanks to our algorithm at the nearest market prices."/>
            </div>
            
            <div>
                <PricingCase redirect="/pricing/premium" choice="Premium" text="Premium" options="The premium formula include a precise date pricing in addition to the basics one. There is a charge for this service."/>
            </div>

        </div>
    )
}

export default PricingChoice
