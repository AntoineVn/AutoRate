import React from 'react'
import { useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../../../hooks/uselocalstorage";
import { TrashIcon } from "@heroicons/react/outline";

function ModalDelete({advert}) {

    const LocalStorage = useLocalStorage

    const userId = LocalStorage('userId')[0]
    const token = LocalStorage('token')[0]
    const roles = LocalStorage('roles')[0]

    const router = useRouter();

    const [ open, setOpen ] = useState(false)

    const del = async (e) => {
        e.preventDefault();

    const delete_advert = new Request(
        "http://localhost:4000/advert/" + advert.id + "?role=" + roles,
        {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            }
        }
        )

        const res = await fetch(delete_advert)
        const data = await res.json()
        console.log(data)


        router.push("/advertisement");
    };

    const openModal = () => {
        setOpen(true);
    };
    
    const close = () => {
        setOpen(false)
        console.log("close")
    } 

    return (
        <div>
      {open == false && (
        <div className="flex items-center cursor-pointer"
          onClick={openModal}>
        <div className="transition duration-100 
        transform hover:scale-105 stroke-current text-red-600 mt-10">
          < TrashIcon className="h-8" />
          <p className="text-2xl font-normal">
            Delete
          </p>
        </div>
      </div>
      )}
      {open == true && (
        <>
          
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start text-black justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Delete</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={close}
                  >
                      X
                    

                  </button>
                </div>
                {/*body*/}
                <div className="flex flex-co text-black items-center text-center p-5">
                    <p>
                        Are you sure you want to delete the advert ?
                    </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-evenly p-6 border-t border-solid border-blueGray-200 rounded-b mt-5">
                  <button
                    className="font-bold uppercase text-red-600 border-gray-300 border text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={close}
                  >
                    Close
                  </button>
                  <button
                    className="font-bold uppercase text-black text-sm px-6 py-3 rounded border-gray-300 border shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={del}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
    )
}

export default ModalDelete
