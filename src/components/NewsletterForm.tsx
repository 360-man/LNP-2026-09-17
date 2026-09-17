import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('lisas_natural_path_email_list')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
      console.error('Subscription error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md text-gray-800 w-full sm:w-48 text-sm"
          disabled={status === 'loading'}
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap bg-brand-green hover:bg-brand-green/90 text-white px-4 py-2 rounded-md flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Mail className="mr-2 h-4 w-4" />
          {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </div>
      {message && (
        <p className={`text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </form>
  );
}