import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Send,
  Facebook,
  Instagram,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const { error } = await supabase
        .from('customer_questions')
        .insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-brand-purple text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're here to help you on your wellness journey. Reach out to us with any questions or concerns.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-serif text-brand-purple mb-8">Lisa's Natural Path</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-brand-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                      <p className="text-gray-600">
                        1779 N. Main St. Ext.,<br />
                        Kerr Business Center,<br />
                        Butler, PA 16001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="text-brand-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Hours</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li>Mondays, Wednesdays, & Thursdays: 10AM – 5PM</li>
                        <li>Tuesdays: 10AM – 5PM</li>
                        <li>Fridays: 10AM – 4PM</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="text-brand-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Phone & Fax</h3>
                      <p className="text-gray-600">
                        Phone: (724) 284-9162<br />
                        Fax: (724) 287-9162
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="text-brand-purple mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email</h3>
                      <p className="text-gray-600">
                        LNPFrontDesk@LisasNaturalPath.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="bg-brand-purple/10 p-3 rounded-full text-brand-purple hover:bg-brand-purple/20 transition-colors"
                    >
                      <Facebook size={24} />
                    </a>
                    <a
                      href="#"
                      className="bg-brand-purple/10 p-3 rounded-full text-brand-purple hover:bg-brand-purple/20 transition-colors"
                    >
                      <Instagram size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Map coming soon</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-serif text-brand-purple mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple h-32"
                    required
                  />
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-red-50 text-red-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <AlertCircle size={20} />
                      <span>
                        {submitStatus === 'success' 
                          ? 'Message sent successfully! We\'ll get back to you soon.' 
                          : 'There was an error sending your message. Please try again.'}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}