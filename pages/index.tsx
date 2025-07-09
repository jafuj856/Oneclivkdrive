import { useRouter } from "next/router";
import React, { useState } from "react";

import Cookies from "js-cookie";
import { Car, Lock, Mail } from "lucide-react";

function index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (email === "oneclickdrive@gmail.com" && password === "123456") {
      Cookies.set("auth", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center h-screen fixed bg-white p-4 w-full">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center border border-black/30 md:min-w-[400px]">
        <h1 className="text-lg mdtext-2x font-bold mt-10 ">Welcom</h1>
        <p className="text-md md:text-lg lg:text-3xl  text-orange-400">
          OneClickDrive
        </p>
        <Car className="mb-5 mt-3" />
        <form className="w-full" onSubmit={handleLogin}>
          {error && (
            <p className="text-red-500 mb-4 text-center text-xs">{error}</p>
          )}

          <div className="w-full mb-4 border border-gray-300 rounded flex items-center px-2">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none  h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Mail width={"12px"} />
          </div>
          <div className="w-full mb-4 border border-gray-300 rounded flex items-center px-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none h-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock width={"12px"} />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default index;
