import React from "react";
import { useRouter } from "next/router";

function AddAdvert() {

    const router = useRouter(); 

    const create = () => {
        router.push("/advertisement/create");
    }
    return (
        <button className="bg-blue-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 rounded 
        focus:outline-none focus:shadow-outline" onClick={create}>
            Post a Advertisement
        </button>
    )
}

export default AddAdvert
