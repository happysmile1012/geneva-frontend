'use client'

import BoomAggregator from "@/components/BoomAggregator";
import { useFingerprint } from "@/components/FingerPrint";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const MarketPlace = () => {
  const router = useRouter();
  const fingerprint = useFingerprint();
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    const auth = async () => {
      if (!fingerprint) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-access?device_id=${fingerprint}`);
        if (res.ok) {
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
  }, [fingerprint])
  return (
    verified && <BoomAggregator/>
  )
}

export default MarketPlace;