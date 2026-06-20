import Link from "next/link";

export default function Navbar(){

    return(

        <nav className="bg-black text-white p-5 flex justify-between items-center">

            <h1 className="text-2xl font-bold">
                FitGennie AI
            </h1>

            <div className="flex gap-5">

                <Link href="/">
                    Home
                </Link>

                <Link href="/signup">
                    Signup
                </Link>

                <Link href="/login">
                    Login
                </Link>

                <Link href="/dashboard">
                    Dashboard
                </Link>

            </div>

        </nav>
    )
}