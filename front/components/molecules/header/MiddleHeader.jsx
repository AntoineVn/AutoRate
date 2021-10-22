import HeaderItem from "../../atoms/header/HeaderItem";
import Link from "next/link"
import { HomeIcon , CollectionIcon, CurrencyEuroIcon } from "@heroicons/react/outline"
import { useEffect, useState } from "react/cjs/react.development";
import { useRouter } from "next/router"

function MiddleHeader() {
    return (
        <div className="flex flex-grow justify-evenly max-w-2xl">
            <Link href="/">
                <a>
                    <HeaderItem title="HOME" Icon={HomeIcon} />
                </a>
            </Link>

            <Link href="/advertisement">
                <a>
                    <HeaderItem title="ADVERTISEMENT" Icon={CollectionIcon} />
                </a>
            </Link>

            <Link href="/pricing">
                <a>
                    <HeaderItem title="PRICING" Icon={CurrencyEuroIcon} />
                </a>
            </Link>
        </div>
    )
}

export default MiddleHeader
