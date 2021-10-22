import HeaderItem from "../../atoms/header/HeaderItem";
import Link from "next/link"
import { CogIcon, LoginIcon, LogoutIcon, UserIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react/cjs/react.development";
import { useRouter } from "next/router"
import useLocalStorage from "../../../hooks/uselocalstorage";

function RightHeader() {

    const router = useRouter();

    const [token, setToken] = useLocalStorage("token", null);
    const [userId, setUserId] = useLocalStorage("userId", null);
    const [username, setUsername] = useLocalStorage("username", null);
    const [roles, setRoles] = useLocalStorage("roles", null);

    const logout = (e) => {
        setToken(null);
        setUserId(null)
        setUsername(null)
        setRoles(null)
        router.push("/");
    };



    return (
        <div className="flex flex-grow justify-evenly max-w-2xl">

            {userId == null &&(
                <Link href="/auth/login">
                    <a>
                        <HeaderItem title="LOGIN" Icon={LoginIcon} />
                    </a>
                </Link>
            )}
            
            {userId != null &&(
                <div className="flex flex-grow justify-evenly max-w-2xl mt-3">

                    { roles == "admin" && (
                        <Link href="/administration">
                            <a>
                                <HeaderItem title="ADMIN" Icon={CogIcon} />
                            </a>
                        </Link>
                    )}
                    

                    <Link href="/profile">
                        <a>
                            <HeaderItem title="PROFILE" Icon={UserIcon} />
                        </a>
                    </Link>

                    
                    <button onClick={logout} className="pb-6">
                        <HeaderItem title="LOGOUT" Icon={LogoutIcon} />
                    </button>
                </div>
            )}
            
        </div>
    )
}

export default RightHeader
