"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    if (!validateEmail(email)) {
      setError('Email is not valid.');
    } else {
      setError('');
      console.log(email, password);
    }
  }

  const validateEmail = (email) => {
    // Simple email regex to validate email format
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const navigateToLogin = () => {
    router.push('/login');
  }

  return (
    <div >
      <header className="pt-[80]"></header>
      <main className="p-[18] pt-0">
        <section className="flex flex-col items-center">
          <div className="px-[40] text-4xl font-bold py-[24]">
            <h1 className="w-[320] h-[48] text-center">Create an account</h1>
          </div>
          <div className="px-[40] w-[400]">
            <div>
              <div className="gap-6 flex flex-col">
                <div>
                  <Input 
                    type="email"
                    placeholder="Email address*" 
                    className={`px-[20] py-[25] focus-visible:ring-0 ${error ? 'border-red-500 focus-visible:border-red-500' : 'focus-visible:border-[#10a37f]'}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>
                <Input 
                  type="password"
                  placeholder="Password*"
                  className="px-[20] py-[25] focus-visible:border-[#10a37f] focus-visible:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="bg-[#10a37f] hover:bg-[#0e9272] text-white w-full h-[52] text-base" onClick={signup}>Sign Up</Button>
              </div>
              <div className="text-sm flex justify-center mt-[25] text-[14px]">
                <div className="mr-2">Already have an account?</div>
                <div className="text-[#10a37f] select-none cursor-pointer" onClick={navigateToLogin}>Login</div>
              </div>
            </div>
            <div className="flex flex-row uppercase border-0 text-[12px] font-normal m-0 py-6 w-[320px] items-center justify-center align-baseline before:content-[''] before:block before:border-b before:border-b-[#c2c8d0] before:flex-1 before:h-[0.5em] before:m-0 after:content-[''] after:block after:border-b after:border-b-[#c2c8d0] after:flex-1 after:h-[0.5em] after:m-0">
              <div className="text-center flex-[0.2_0_auto] m-0 h-[12px]">Or</div>
            </div>
            <div>
              <Button className="w-full">
                <img src="/google.svg" alt="google" className="w-[16] h-[16]" />
                Login with Google
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignUp;