import { FaTimesCircle } from 'react-icons/fa';

export default function PaymentFailPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[40vh]">
      <FaTimesCircle className="text-[var(--color-error)] text-5xl mb-4" />
      <h1 className="text-2xl font-bold text-[var(--color-error)]">Payment Failed</h1>
      <p className="text-[var(--text-secondary)]">Try again later.</p>
    </div>
  );
}
