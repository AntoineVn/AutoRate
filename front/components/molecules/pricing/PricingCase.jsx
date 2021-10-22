import BlueButton from "../../atoms/button/BlueButton";
import PricingCaseStyle from "../../atoms/pricing/PricingCaseStyle";

function PricingCase({choice, options, redirect}) {

    return (
        <div>
            <PricingCaseStyle title={choice} options={options} redirect={redirect}>
            </PricingCaseStyle>
            
        </div>
    )
}

export default PricingCase
