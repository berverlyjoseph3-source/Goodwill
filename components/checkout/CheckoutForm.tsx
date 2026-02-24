import { useState } from 'react';

interface CheckoutFormProps {
  step: 'information' | 'shipping' | 'payment';
  onStepChange: (step: 'information' | 'shipping' | 'payment') => void;
}

export const CheckoutForm = ({ step, onStepChange }: CheckoutFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    shippingMethod: 'standard',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'information') {
      onStepChange('shipping');
    } else if (step === 'shipping') {
      onStepChange('payment');
    }
  };

  if (step === 'information') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="apartment" className="block text-sm font-medium text-slate-700 mb-1">
            Apartment, suite, etc. (optional)
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-slate-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-slate-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              required
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-slate-700 mb-1">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-blue focus:border-transparent"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="MX">Mexico</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary py-3"
        >
          Continue to Shipping
        </button>
      </form>
    );
  }

  if (step === 'shipping') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Shipping Method</h2>
        
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-medical-blue">
            <input
              type="radio"
              name="shippingMethod"
              value="standard"
              checked={formData.shippingMethod === 'standard'}
              onChange={handleChange}
              className="w-4 h-4 text-medical-blue focus:ring-medical-blue"
            />
            <div className="ml-3 flex-1">
              <p className="font-medium text-slate-900">Standard Shipping</p>
              <p className="text-sm text-slate-500">3-5 business days</p>
            </div>
            <p className="font-medium text-slate-900">$5.99</p>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-medical-blue">
            <input
              type="radio"
              name="shippingMethod"
              value="express"
              checked={formData.shippingMethod === 'express'}
              onChange={handleChange}
              className="w-4 h-4 text-medical-blue focus:ring-medical-blue"
            />
            <div className="ml-3 flex-1">
              <p className="font-medium text-slate-900">Express Shipping</p>
              <p className="text-sm text-slate-500">1-2 business days</p>
            </div>
            <p className="font-medium text-slate-900">$12.99</p>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onStepChange('information')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary py-2"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    );
  }

  if (step === 'payment') {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-900">Payment</h2>
        
        <div className="p-4 bg-soft-gray rounded-lg">
          <p className="text-sm text-slate-600">
            This is a demo. In production, you would integrate with Stripe here.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onStepChange('shipping')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => alert('Order placed! (Demo)')}
            className="flex-1 btn-primary py-2"
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }

  return null;
};