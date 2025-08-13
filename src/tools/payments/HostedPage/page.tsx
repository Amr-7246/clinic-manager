/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { usePostEntity } from '@/APIs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '@/app/components/Loading';
import { FaShoppingBag } from 'react-icons/fa';

// ~ Integrate that At real usage 
  // import { useGetEntity } from '@/APIs';
  // const  { data : ITEMS } = useGetEntity('')
  // const  { data : userInfo } = useGetEntity('')
  // const user =  userInfo._Id
// ~ Integrate that At real usage 

const ITEMS = [
  { id: '1', name: 'T-shirt', price: 25, currency: 'usd' },
  { id: '2', name: 'Shoes', price: 80, currency: 'usd' },
];

export default function ItemsPage() {
  const  { mutateAsync : InitiPayment  } = usePostEntity<{ url: string }, { item: any, user: any }>('/book/init-payment')
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBuy = async (item: any) => {
    setLoading(true);
    try {
      const user = { id: 'u123' };
      const res = await InitiPayment({ item, user });
      router.push(res.url); //& Redirect to Stripe Checkout
    } catch (err) {
      alert('Failed to start payment.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      
      <h1 className="text-2xl mb-4 font-bold flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
        <FaShoppingBag className="inline" /> Shop Items
      </h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {ITEMS.map(item => (
          <div key={item.id} className="border p-4 rounded shadow bg-[var(--surface)]">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">{item.name}</h2>
            <p className="text-[var(--text-secondary)]">{item.price} {item.currency.toUpperCase()}</p>
            <button
              className="bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] px-4 py-2 mt-2 rounded w-full flex items-center justify-center gap-2 hover:bg-[var(--button-primary-hover-bg)] duration-200"
              onClick={() => handleBuy(item)}
              disabled={loading}
            >
              {loading ? <Loading size="sm" /> : <span>Buy Now</span>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
