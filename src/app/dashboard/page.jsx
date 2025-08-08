'use client'

import {LLMAggregator} from "@/components/LLMAggregator";
import { useFingerprint } from "@/components/FingerPrint";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const Dashboard = () => {
  const router = useRouter();
  const fingerprint = useFingerprint();
  const [verified, setVerified] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    const auth = async () => {
      if (!fingerprint) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-access?device_id=${fingerprint}`);
        if (res.ok) {
          const data = await res.json(); // Parse JSON response
          setEmail(data.email);
          setVerified(true)
        } else {
          router.push("/login");
        }
      } catch (err) {
        toast.error('Authorization Failed')
        router.push("/login");
      }
    };
    auth();
    setIsClient(true);
  }, [fingerprint])
  return (
    isClient && verified && <LLMAggregator email={email}/>
  )
}

export default Dashboard;