import { useRouter } from "next/router"

function BlueButton({title, redirect}) {

    const router = useRouter()

    return (
        <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline"
                    type="submit"
                    onClick={() => router.push(`${redirect}`)}
            >
                {title}
            </button>
            
        </div>
    )
}

export default BlueButton
