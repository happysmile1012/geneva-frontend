'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFingerprint } from "@/components/FingerPrint";
import toast from 'react-hot-toast';

export default function Home() {
  const fingerprint = useFingerprint();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const auth = async () => {
      if (!fingerprint) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-access?device_id=${fingerprint}`);
        if (res.ok) {
          router.push('/dashboard')
        } else {
          router.push("/login");
        }
      } catch (err) {
        toast.error('Authorization Failed')
        router.push("/login");
      }
    };

    auth();
  }, [fingerprint]);

  return (
    isClient && <div className="relative bg-[url('/image/background-light.png')] bg-[length:100%_100%] bg-no-repeat bg-center">
    </div>
  )
}