import { useRouter } from "next/router";
import CreateAdvertPage from "../../components/organisms/advertisement/CreateAdvertPage";
import Header from "../../components/organisms/header/Header";
import useLocalStorage from "../../hooks/uselocalstorage";


function Create() {

    const router = useRouter()

    const LocalStorage = useLocalStorage

    const username = LocalStorage('username')[0]

    const back = () => {
      router.push('/auth/login')
    }

    return (
        <div>
            {username && (
                <CreateAdvertPage/>
            )}
            
            
            {!username && (

                <div>
                    <Header />

                
                    <div className="flex flex-col bg-white w-1/4 mr-auto ml-auto rounded border-4">
                        <h1 className="text-center text-5xl text-black  ">Connect First ! </h1>
            
                        <button
                            className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline w-1/3 ml-36 my-5"
                            onClick={back}
                        >
                            Login
                            </button>
                    </div>
                </div>
            )}
            
        </div>
    )
}

export default Create
