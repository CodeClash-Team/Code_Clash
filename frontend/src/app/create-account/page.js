"use client";

import Logo from "@components/Logo";
import Link from "next/link";
import { useState } from "react";

export default function Create_Account() {

  const [error, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.password, e.target.confirmPassword);

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setErrorMessage("Passwords do not match");
    }
  };

  return (
    <>
      <Logo />
      <div className="p-8 sm:p-10 font-[family-name:var(--font-geist-sans)]">
        <h1 className="text-4xl font-bold mb-8 text-center">Register</h1>
        <div className="max-w-md mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:border-transparent"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              className="w-full rounded-full border border-solid border-black/[.15] dark:border-white/[.25] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 mt-4"
              type="submit"
            >
              Submit
            </button>
          </form>
          <Link href="/login" className="text-sm text-right text-blue-500 hover:underline mt-4 block">Already a user? Login here</Link>
        </div>
      </div>
    </>
  );
}
