import React, { useState } from 'react';
import { ChevronDown, Calendar, Info, X, ExternalLink } from 'lucide-react';
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
            className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-2.5 rounded-full inline-flex items-center justify-center transition-colors"
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
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
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
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            {service.types && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Service Type</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
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
                <label className="block text-gray-700 font-medium mb-2">Duration</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
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
              <label className="block text-gray-700 font-medium mb-2">Preferred Date</label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Preferred Time</label>
              <select
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
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
            <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple h-28"
              placeholder="Any specific concerns or requests..."
            />
          </div>

          {message && (
            <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
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
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccessMessage(true);
  };

  return (
    <div>
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

      {/* Services List */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {servicesData.map((service) => (
              <div 
                key={service.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div 
                  className="cursor-pointer flex items-center justify-between p-6 bg-white hover:bg-purple-50/50 transition-colors"
                  onClick={() => setExpandedService(expandedService === service.title ? null : service.title)}
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl md:text-2xl font-serif text-brand-purple font-semibold">{service.title}</h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/services/${service.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hidden sm:inline-flex items-center gap-1 text-xs text-brand-purple hover:underline font-semibold bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100"
                    >
                      View Page <ExternalLink size={12} />
                    </Link>
                    <ChevronDown 
                      size={24} 
                      className={`text-brand-purple transition-transform duration-200 ${
                        expandedService === service.title ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {expandedService === service.title && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-white">
                    {service.overview && (
                      <p className="text-gray-700 mb-6 leading-relaxed text-sm md:text-base">{service.overview}</p>
                    )}

                    {service.types && (
                      <div className="mb-6">
                        <h3 className="text-base font-semibold mb-3 text-gray-900">Available Types:</h3>
                        <div className="grid gap-3">
                          {service.types.map((type) => (
                            <div key={type.name} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                              <h4 className="font-semibold text-brand-purple text-sm mb-1">{type.name}</h4>
                              <p className="text-gray-600 text-xs md:text-sm">{type.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {service.pricing && service.pricing.length > 0 && (
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Pricing:</h3>
                          <div className="grid gap-2">
                            {service.pricing.map((price, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100 text-sm">
                                <span className="font-medium text-gray-700">{price.duration || price.name || 'Single Session'}</span>
                                <span className="font-semibold text-brand-purple text-base">{price.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.packages && (
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Packages:</h3>
                          <div className="grid gap-2">
                            {service.packages.map((pkg, index) => (
                              <div key={index} className="bg-brand-purple/10 p-4 rounded-xl border border-brand-purple/20">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-semibold text-gray-900 text-sm">{pkg.name}</span>
                                  <span className="text-brand-purple font-bold">{pkg.price}</span>
                                </div>
                                {(pkg.savings || pkg.bonus) && (
                                  <p className="text-xs text-brand-purple font-medium">
                                    {pkg.savings} {pkg.bonus && `• ${pkg.bonus}`}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.additionalOptions && (
                        <div>
                          <h3 className="text-base font-semibold mb-3 text-gray-900">Additional Options:</h3>
                          <div className="grid gap-2">
                            {service.additionalOptions.map((option, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center mb-1 text-sm">
                                  <span className="text-gray-700">{option.name}</span>
                                  <span className="font-semibold text-brand-purple">{option.price}</span>
                                </div>
                                {option.savings && (
                                  <p className="text-xs text-brand-purple">{option.savings}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-colors shadow-md"
                      >
                        <Calendar className="mr-2" size={18} />
                        Book Appointment
                      </button>

                      <Link
                        to={`/services/${service.slug}`}
                        className="bg-white hover:bg-purple-50 text-brand-purple border border-brand-purple/30 px-6 py-3 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-colors shadow-sm"
                      >
                        Dedicated Page <ChevronRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
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