"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSignup() {

        try {

            setLoading(true);

            let response = await fetch(
                "http://127.0.0.1:8000/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

            let data = await response.json();

            if (
                data.message === "Signup Successful"
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userEmail",
                    email
                );

                router.push("/dashboard");

            } else {

                alert(data.message);

            }

        } catch (error) {

            alert("Signup Failed");

        } finally {

            setLoading(false);

        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

            <div className="bg-slate-900/60 backdrop-blur-lg border border-slate-700 p-10 rounded-3xl shadow-xl w-[90%] max-w-[400px] hover:border-blue-500 transition-all duration-300">

                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    Signup
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 p-4 rounded-xl mb-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 p-4 rounded-xl mb-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-600 p-4 rounded-xl mb-5 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={handleSignup}
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white w-full py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-70"
                >
                    {loading ? "Creating your account..." : "Signup"}
                </button>

                <p className="mt-5 text-center text-slate-400">
                    Already have an account?

                    <Link
                        href="/login"
                        className="text-blue-400 ml-2 hover:text-cyan-400 font-semibold"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}