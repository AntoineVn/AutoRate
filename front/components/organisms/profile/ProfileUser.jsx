import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development';
import useLocalStorage from '../../../hooks/uselocalstorage'

function ProfileUser() {

    const [token, setToken] = useLocalStorage("token", null);
    const [userId, setUserId] = useLocalStorage("userId", null);
    const [username, setUsername] = useLocalStorage("username", null);
    const [roles, setRoles] = useLocalStorage("roles", null);

    const [users, setUser] = useState(() => {});

    const [box, setBox] = useState(true)
    const [edit, setEdit] = useState(false)
    const [bills, setBills] = useState(false)
    const [pricing, setPricing] = useState(false)

    const [newUsername, setNewUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const [wrong, setWrong] = useState("")

    useEffect(async () => {
        await fetch("http://localhost:4000/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json())
        .then((profileUser) => {
            setUser(profileUser)
            setEmail(profileUser.email)
            setNewUsername(profileUser.username)
            console.log("Profile", profileUser)
        })
    }, [])


    const editUser = () => {
        setBox(false)
        setEdit(true)
    }

    const cancelEdit= () => {
        setBox(true)
        setEdit(false)
    }

    const editChange = async (e) => {
        e.preventDefault()

        if (password == confirm && password != "" && confirm != "") {
            const user_url = "http://localhost:4000/users/" + userId + "?role=" + roles

            const patch_user = new Request(user_url, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token,
                },
                body: JSON.stringify({
                    username: newUsername,
                    email: email,
                    password: password
                })
            })
            
            const res_patch = await fetch(patch_user)
            const data_patch= await res_patch.json()
            console.log(data_patch)
            setBox(true)
            setEdit(false)
            setUsername(newUsername)

        }
        else {
            setWrong("Wrong Credentials")
        }
    }

    const SeePricing = () => {
        setBox(false)
        setPricing(true)
    }

    const ComeBackPricing = () => {
        setBox(true)
        setPricing(false)
    }

    const SeeBills = () => {
        setBox(false)
        setBills(true)
    }

    const ComeBackBills = () => {
        setBox(true)
        setBills(false)
    }


    return (
        <div>
            { box == true && (
                <div className="h-40 w-1/2 mr-auto ml-auto items-center bg-white mt-40 rounded">
                
                    <div className="text-center text-black text-2xl font-bold pt-6">
                        <p>
                            {username}
                        </p>
                    </div>

                    <div className="flex flex-row justify-evenly mt-5">
                        <div onClick={editUser}>
                            <button className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline">
                                EDIT
                            </button>
                        </div>

                        <div onClick={SeePricing}>
                            <button className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline">
                                PRICING
                            </button>
                        </div>

                        <div onClick={SeeBills}>
                            <button className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded 
                            focus:outline-none focus:shadow-outline">
                                BILLS
                            </button>
                        </div>
                    </div>

                </div>
            )}


            {edit == true && (
                <div className="ml-auto mr-auto w-1/4 pt-24">
                    <div className="w-full">
                        
            
                    <form
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                        onSubmit={editChange}
                    >
                        <div className="text-2xl text-black font-bold text-center my-5">
                            <h1>Edit Profile</h1>
                        </div>
                        

                        <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            name="username"
                            type="text"
                            placeholder={newUsername}
                            value={newUsername}
                            onChange={(e) => {
                                setNewUsername(e.target.value)
                                setWrong("")
                                }
                            }
                        />
                        </div>
            
                        <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="username"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder={email}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setWrong("")
                                }
                            }
                        />
                        </div>
            
                        <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setWrong("")
                                }
                            }
                        />
                        </div>
            
                        <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            for="password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="confirm"
                            name="confirm"
                            type="password"
                            placeholder="********"
                            value={confirm}
                            onChange={(e) => {
                                setConfirm(e.target.value),
                                setWrong("")
                                }
                            }
                        />
                        </div>

                        { wrong != "" && (
                            <div className="text-center text-red-600 text-xl font-bold my-3">
                                {wrong}
                            </div>
                        )}
            
                        <div className="text-center flex flex-row justify-evenly">
                            <div>
                               <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Save 
                                </button> 
                            </div>

                            <div>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={cancelEdit}
                                >
                                    Cancel 
                                </button> 
                            </div>
                        
                        </div>
            
                    </form>
                    </div>
                </div>
            )}
            
            { pricing == true && (
                <div className="bg-white ml-auto mr-auto rounded-lg w-3/4 pt-5 pb-4">
                    <table className="table-auto bg-white ml-auto mr-auto rounded-lg text-black w-3/4">
                        <thead>
                            <tr className="py-10">
                                <th>
                                    Description
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Formula Pricing
                                </th>

                                <th>
                                    Private Sellor Price
                                </th>

                                <th>
                                    Professional Sellor Price
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                            {users != "" && users.pricing.map((pricing) => (
                                <tr key={pricing.id}
                                className="rounded shadow hover:shadow-lg outline-none"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pricing.description}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pricing.date}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pricing.formula}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pricing.priv} €
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pricing.professional} €
                                            </div>
                                        </div>
                                    </td>      
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>

                    <div className="text-center mt-5 mb-5">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={ComeBackPricing}
                        >
                            Come Back
                        </button> 
                    </div>

                </div>
            )}

            {bills == true && (
                <div className="bg-white ml-auto mr-auto rounded-lg w-3/4 pt-5 pb-4">
                <table className="table-auto bg-white ml-auto mr-auto rounded-lg text-black w-3/4">
                    <thead>
                        <tr className="py-10">
                            <th>
                                Link of the invoice
                            </th>

                            <th>
                                Date
                            </th>

                            <th>
                                 Price
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        {users != "" && users.invoices.map((invoice) => (
                            <tr key={invoice.id}
                            className="rounded shadow hover:shadow-lg outline-none"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            <a href={invoice.bill}>
                                                {invoice.bill}
                                            </a>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {invoice.date}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-center">
                                        <div className="text-sm font-medium text-gray-900">
                                            {invoice.amount}
                                        </div>
                                    </div>
                                </td>
 
                            </tr>
                        ))}
                    </tbody>
                    
                </table>

                <div className="text-center mt-5 mb-5">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={ComeBackBills}
                    >
                        Come Back
                    </button> 
                </div>

            </div>
            )}
        </div>
        
    )
}

export default ProfileUser
