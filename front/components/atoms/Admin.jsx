import { useRouter } from 'next/router'
import React from 'react'
import { forwardRef } from 'react/cjs/react.development'
import useLocalStorage from '../../hooks/uselocalstorage'

const Admin = forwardRef(({user}, ref) => {

    const LocalStorage = useLocalStorage;
    
    const router = useRouter()

    const userId = LocalStorage("userId")[0];
    const token = LocalStorage("token")[0];
    const roles = LocalStorage("roles")[0];
    const username = LocalStorage("username")[0];

    const del = async (e) => {
        e.preventDefault()

        const user_url = "http://localhost:4000/users/" + user.id + "?role=" + roles

        const del_user = new Request(user_url, {
            method:"DELETE",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })

        const res_user = await fetch(del_user)
        const data_user = await res_user.json()
        console.log(data_user)

        router.push("administration")

    }

    const promote = async (e) => {
        e.preventDefault()

        const user_url = "http://localhost:4000/users/" + user.id + "?role=" + roles

        const patch_user = new Request(user_url, {
            method:"PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roles: "admin"
            })
        })

        const res_user = await fetch(patch_user)
        const data_user = await res_user.json()
        console.log(data_user)

        router.push("administration")
    }

    const demote = async (e) => {
        e.preventDefault()

        const user_url = "http://localhost:4000/users/" + user.id + "?role=" + roles

        const patch_user = new Request(user_url, {
            method:"PATCH",
            headers: {
                "Authorization": "Bearer " + token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                roles: "client"
            })
        })

        const res_user = await fetch(patch_user)
        const data_user = await res_user.json()
        console.log(data_user)

        router.push("administration")
    }

    return (    
        <div ref={ref}>
            <div className="bg-white ml-auto mr-auto  w-3/4 pt-5 pb-4">
                <table className="bg-gray-200 ml-auto mr-auto rounded-lg text-black w-3/4">
                    <thead>
                        <tr className="py-10">
                            <th>
                                Username
                            </th>

                            <th>
                                Email
                            </th>

                            <th>
                                Roles
                            </th>

                            <th>
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        
                            <tr key={user.id}
                            className="rounded shadow hover:shadow-lg outline-none"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            
                                                {user.username}
                                            
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.email}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.roles}
                                        </div>
                                    </div>
                                </td>

                                <td className="flex flex-row justify-evenly">
                                    <div>
                                        <button onClick={del} className="bg-red-500 hover:bg-red-800 
                                        text-white font-bold py-2 px-4 rounded 
                                        focus:outline-none focus:shadow-outline">
                                            Delete
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={promote} className="bg-blue-500 hover:bg-blue-700 
                                        text-white font-bold py-2 px-4 rounded 
                                        focus:outline-none focus:shadow-outline">
                                            Promote
                                        </button>
                                    </div>

                                    <div>
                                        <button onClick={demote} className="bg-blue-500 hover:bg-blue-700 
                                        text-white font-bold py-2 px-4 rounded 
                                        focus:outline-none focus:shadow-outline">
                                            Demote
                                        </button>
                                    </div>
                                </td>
 
                            </tr>
                        
                    </tbody>
                    
                </table>
            </div>
        </div>
        
    )
})

export default Admin