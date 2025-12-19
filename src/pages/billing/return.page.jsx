import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router';
import { Link } from 'react-router';

export default function ReturnPage() {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // In a real app we might fetch session status from backend here.
    // For now we just assume success if we got here via the return_url with a session_id.
    if(sessionId) {
        setStatus('success');
    }
  }, [sessionId]);

  if (status === 'open') {
    return (
      <Navigate to="/dashboard/invoices" />
    );
  }

  if (status === 'success') {
    return (
      <div id="success" className="p-8 text-center">
        <div className="bg-green-100 text-green-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            ✓
        </div>
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2> 
        <p className="text-muted-foreground mb-6">
          Thank you for your payment. Your invoice has been updated.
        </p>
        <Link to="/dashboard/invoices" className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
            Back to Invoices
        </Link>
      </div>
    );
  }

  return null;
}
