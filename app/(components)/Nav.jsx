import Link from "next/link"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

const Nav = async () => {
    const session = await getServerSession(options);
    return (
        <header className="bg-gray-600 text-gray-100">
            <nav className="flex justify-between items-center w-full px-10 py-4">
                <div>Next Auth</div>
                <div className="flex gap-10">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/admin">Admin Panel</Link>
                    <Link href="/profile">Profile</Link>
                    {session ? <Link href="/api/auth/signout?callbackUrl=/">Logout</Link> : <Link href="/api/auth/signin">Login</Link>}
                </div>
            </nav>
        </header>
    )
}

export default Nav