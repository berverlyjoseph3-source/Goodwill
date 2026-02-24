import Image from 'next/image';
import Link from 'next/link';

interface OrderSummaryProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  subtotal: number;
}

export const OrderSummary = ({ items, subtotal }: OrderSummaryProps) => {
  const shipping = subtotal > 500 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
      
      {/* Items */}
      <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-soft-gray rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900 line-clamp-1">
                {item.name}
              </p>
              <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-slate-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Calculations */}
      <div className="space-y-2 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Shipping</span>
          <span className="font-medium text-slate-900">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Estimated Tax</span>
          <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-slate-500">
            Free shipping on orders over $500
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
        <span className="text-base font-semibold text-slate-900">Total</span>
        <span className="text-xl font-bold text-medical-blue">${total.toFixed(2)}</span>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-center text-slate-500">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
};