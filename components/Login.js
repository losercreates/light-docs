import React from "react";
import { signIn } from "next-auth/react";
function Login() {
  return (
    <div className="h-screen bg-hero-pattern flex">
      <div className="flex-1 m-4 p-5 grid place-items-center">
        <div>
          <h1 className="font-bold text-7xl text-amber-900 mb-9">Light Docs</h1>
          <h2 className="text-xl font-medium">
            A lightweight documents editor to pen down your thoughts and actions
          </h2>
          <button
            className="bg-amber-900 py-3 px-5 text-[#FFF8C7] font-semibold text-lg my-32"
            onClick={signIn}
          >
            Get Started
          </button>
        </div>
      </div>
      <div className="flex-1 m-4 hidden sm:grid place-items-center">
        <img src="/assets/hero_img.png" alt="Person typing on a Laptop" />
      </div>
    </div>
  );
}

export default Login;
