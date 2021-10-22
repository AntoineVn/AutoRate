import MiddleHeader from "../../molecules/header/MiddleHeader";
import RightHeader from "../../molecules/header/RightHeader";
import { useRouter } from "next/router"
import Image from "next/image"


function Header() {
    const router = useRouter();

    const back = () => {
        router.push("/")
    }

    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
            <Image
                className="object-contain cursor-pointer"
                src="https://i.ibb.co/61DKthq/Autorate.png"
                width={100}
                height={100}
                onClick={back}
            />

            <div>
                <MiddleHeader/>
            </div>

            <div>
                <RightHeader/>
            </div>

            
        </header>
    )
}

export default Header
