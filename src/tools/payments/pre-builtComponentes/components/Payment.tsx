"use client"
import { useBooking } from '@/context/BookingContext';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'

const Payment = () => {
  // ~ ########### Hooks 
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('initial');
    const { booking } = useBooking();
  // ~ ########### Hooks 
  // ~ ########### Logics 
  
    // & Fetch clientSecret & bookingId from server
      useEffect(() => {
        const fetchData = async () => {
          const res = await fetch('/api/bookings/initiate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ travelId: 'abc123', userId: 'u456' }),
          });
          
          const data = await res.json();
          setClientSecret(data.clientSecret);
          setBookingId(data.bookingId);
        };
        
        fetchData();
      }, []);
    // & Fetch clientSecret & bookingId from server
    // & Submit payment
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret) return;
      
        setStatus('processing');
      
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });
      
        if (result.error) {
          console.error(result.error.message);
          setStatus('error');
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            setStatus('success');
            // Redirect to success page or show success message
          }
        }
      };
    // & Submit payment

  // ~ ########### Logics 

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardElement className="border p-4 rounded-md shadow-sm" />
      <button type="submit" disabled={!stripe || !elements} className="bg-sky-600 cursor-pointer duration-700 text-white py-2 px-4 rounded-lg w-full hover:bg-sky-700 transition" >
        {status === 'processing' ? 'Processing...' : 'Pay Now'}
      </button>
      {status === 'success' && <p className="text-green-600"> Payment Successful!</p>}
      {status === 'error' && <p className="text-rose-600"> Payment failed. Try again.</p>}
    </form>
  );
}

export default Payment
