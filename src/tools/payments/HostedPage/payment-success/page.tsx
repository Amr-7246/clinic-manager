'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';


export default function PaymentSuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'incomplete' | 'error'>('loading');

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`/api/payment/verify-session?session_id=${sessionId}`);
        if (res.data.paid) {
          setStatus('success');
        } else {
          setStatus('incomplete');
        }
      } catch {
        setStatus('error');
      }
    };

    if (sessionId) verify();
  }, [sessionId]);

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[40vh]">

      {status === 'loading' && <Loading size="md" />}
      
      {status === 'success' && (
        <>
          <FaCheckCircle className="text-[var(--color-success)] text-5xl mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-success)]">Payment Successful!</h1>
        </>
      )}
      {status === 'incomplete' && (
        <>
          <FaExclamationTriangle className="text-[var(--color-warning)] text-5xl mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-warning)]">Payment Incomplete</h1>
        </>
      )}
      {status === 'error' && (
        <>
          <FaTimesCircle className="text-[var(--color-error)] text-5xl mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-error)]">Error verifying payment</h1>
        </>
      )}
    </div>
  );
}
