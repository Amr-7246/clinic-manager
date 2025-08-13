'use client';

import { useEffect, useState } from "react";
import BookingForm from "../components/BookingForm";
import Payment from "../components/Payment";

export default function Page() {
  const [IsPaynow, setIsPaynow] = useState(false)
  useEffect(() => {
    if (IsPaynow) {
      document.getElementById('paynow')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [IsPaynow])
  return (
    <div className="flex flex-col gap-3">
      <div>
        <BookingForm setIsPaynow={setIsPaynow} />
      </div>
      <div  id="paynow" className={`${IsPaynow ? 'block' : 'hidden'}`}>
        <Payment/>
      </div>
    </div>
  );
}