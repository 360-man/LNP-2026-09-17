import React, { useState } from 'react';
import { Calendar, ChevronRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { servicesData, ServiceItem } from '../data/servicesData';
import serviceMassageImage from '../../assets/Service_Massage.png';

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Successful!</h3>
          <p className="text-gray-600 text-sm mb-6">
            Booking request submitted successfully! We will contact you shortly to confirm your appointment.
          </p>
          <button
            onClick={onClose}
            className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-2.5 rounded-full inline-flex items-center justify-center transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface BookingFormProps {
  service: ServiceItem;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ service, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: service.types ? service.types[0].name : service.title,
    duration: service.pricing ? (service.pricing[0].duration || service.pricing[0].name || '30 minutes') : '30 minutes',
    preferred_date: '',
    preferred_time: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([{
          ...formData,
          service_title: service.title,
          status: 'new'
        }]);

      if (error) throw error;

      setStatus('success');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
      setStatus('error');
      setMessage('Failed to submit booking request. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto border border-gray-100 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-full"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-serif text-brand-purple mb-6">Book {service.title}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            {service.types && (
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Service Type</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  required
                >
                  {service.types.map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
            )}

            {service.pricing && (
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  required
                >
                  {service.pricing.map((price, idx) => (
                    <option key={idx} value={price.duration || price.name || 'Standard'}>
                      {price.duration || price.name || 'Session'} - {price.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Preferred Date</label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">Preferred Time</label>
              <select
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              >
                <option value="">Select a time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple h-28"
              placeholder="Any specific concerns or requests..."
            />
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50 font-semibold"
          >
            <Calendar className="w-5 h-5" />
            {status === 'loading' ? 'Submitting...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccessMessage(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-12 md:py-16 bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${serviceMassageImage})`,
        }}
      >
        <div className="absolute inset-0 bg-brand-purple/50 backdrop-blur-[1px] z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold drop-shadow-md mb-3">Our Services</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Experience the transformative power of holistic healing through our comprehensive wellness services
          </p>
        </div>
      </section>

      {/* Services Cards Grid */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {servicesData.map((service) => (
              <div 
                key={service.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-200"
              >
                <div>
                  <div className="h-44 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 overflow-hidden rounded-t-2xl relative bg-gray-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>

                  <h2 className="text-2xl font-serif text-brand-purple font-bold mb-3">
                    <Link to={`/services/${service.slug}`} className="hover:underline">
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
                    {service.overview}
                  </p>

                  {/* Pricing Overview Tags */}
                  {service.pricing && service.pricing.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.pricing.map((price, idx) => (
                        <span key={idx} className="bg-purple-50/80 text-brand-purple text-xs font-semibold px-3 py-1.5 rounded-full border border-purple-100">
                          {price.duration || price.name || 'Session'}: {price.price}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 mt-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-3 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-colors shadow-md"
                  >
                    Learn More
                    <ChevronRight size={18} className="ml-1" />
                  </Link>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="flex-1 bg-white hover:bg-purple-50 text-brand-purple border border-brand-purple/30 px-5 py-3 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Calendar className="mr-2" size={18} />
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Modal */}
      {selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <SuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
    </div>
  );
};