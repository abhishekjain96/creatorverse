// File: src/components/BuyButton.jsx (Updated)
'use client';

import { useState } from 'react';

export default function BuyButton({ product }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    // 1. Create a Razorpay order
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: product.price * 100,
        currency: 'INR',
      }),
    });

    const order = await orderResponse.json();
    if (!orderResponse.ok) {
      alert(`Error: ${order.error}`);
      setIsLoading(false);
      return;
    }

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'CreatorVerse',
      description: `Payment for ${product.name}`,
      order_id: order.id,
      handler: async function (response) {
        // This function is called after a successful payment
        alert('Payment Successful! Generating your download link...');

        // 3. Get the secure download link from our new API
        const downloadLinkResponse = await fetch('/api/get-download-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath: product.file_path }),
        });

        const { signedURL, error } = await downloadLinkResponse.json();

        if (error) {
          alert("Sorry, couldn't get the download link. Please contact support.");
        } else {
          // 4. Trigger the file download
          window.location.href = signedURL;
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
      },
      theme: {
        color: '#4f46e5',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    // If the user closes the Razorpay modal, stop loading
    rzp.on('payment.failed', function (response) {
        setIsLoading(false);
        alert('Payment failed. Please try again.');
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full py-3 px-6 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
    >
      {isLoading ? 'Processing...' : 'Buy Now'}
    </button>
  );
}