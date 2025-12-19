import { useEffect, useState, useCallback } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/clerk-react"; // To get token if needed, but cookies usually handle it if same domain or proxy.
// Actually we need to pass the token in headers if we are not using cookies.
// The PRD implies standard auth. Use fetch with headers if needed.
import { useAuth } from "@clerk/clerk-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [clientSecret, setClientSecret] = useState(null);
  const { getToken } = useAuth();
  
  const fetchInvoices = useCallback(async () => {
      const token = await getToken();
      try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/billing/invoices`, {
               headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
              setInvoices(await res.json());
          }
      } catch (err) {
          console.error(err);
      }
  }, [getToken]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handlePay = async (invoiceId) => {
      const token = await getToken();
      try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/billing/create-checkout-session`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ invoiceId }),
          });
          const data = await res.json();
          setClientSecret(data.clientSecret);
      } catch(err) {
          console.error(err);
      }
  };

  if (clientSecret) {
    return (
      <div id="checkout" className="p-8 bg-white rounded-xl">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        <button onClick={() => setClientSecret(null)} className="mt-4 text-sm text-muted-foreground underline">
            Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Invoices</h1>
      <div className="bg-white rounded-xl shadow border border-border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="p-4 font-medium">Period</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No invoices found.</td></tr>
            ) : (
                invoices.map((inv) => (
                <tr key={inv._id} className="border-b border-border last:border-0 hover:bg-secondary/20">
                    <td className="p-4">
                        {new Date(inv.periodStart).toLocaleDateString()} - {new Date(inv.periodEnd).toLocaleDateString()}
                    </td>
                    <td className="p-4">${inv.amount.toFixed(2)}</td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            inv.status === 'PAID' ? 'bg-green-100 text-green-700' : 
                            inv.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                            {inv.status}
                        </span>
                    </td>
                    <td className="p-4">
                        {inv.status === 'PENDING' && (
                            <button 
                                onClick={() => handlePay(inv._id)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition"
                            >
                                Pay Now
                            </button>
                        )}
                        {inv.status === 'PAID' && <span className="text-muted-foreground text-sm">Paid</span>}
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
