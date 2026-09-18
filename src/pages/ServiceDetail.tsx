import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, CheckCircle2, ArrowLeft, Clock, ShieldCheck, X } from 'lucide-react';
import { getServiceBySlug, servicesData, ServiceItem } from '../data/servicesData';
import { supabase } from '../lib/supabase';
import backgroundLavender from '../../assets/background-Lavender-header.png';

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
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl md:text-3xl font-serif text-brand-purple mb-2">Book {service.title}</h2>
        <p className="text-gray-600 text-sm mb-6">Complete your information to request an appointment with our specialists.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                required
              />
            </div>

            {service.types && service.types.length > 0 && (
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">Service Option</label>
                <select
                  value={formData.service_type}
                  onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                  required
                >
                  {service.types.map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
            )}

            {service.pricing && service.pricing.length > 0 && (
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 text-sm">Duration / Package</label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                  required
                >
                  {service.pricing.map((price, idx) => (
                    <option key={idx} value={price.duration || price.name || 'Standard'}>
                      {price.duration || price.name || 'Session'} — {price.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">Preferred Date</label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 text-sm">Preferred Time</label>
              <select
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                required
              >
                <option value="">Select a preferred time</option>
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
            <label className="block text-gray-700 font-medium mb-1.5 text-sm">Additional Notes / Health Concerns</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none h-28"
              placeholder="Please let us know any health goals, allergies, or questions..."
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
            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold px-6 py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            <Calendar size={20} />
            {status === 'loading' ? 'Submitting Booking Request...' : 'Confirm Appointment Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!service) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-3xl font-serif text-brand-purple mb-4">Service Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">The service page you are looking for doesn't exist or has been moved.</p>
        <Link
          to="/services"
          className="bg-brand-purple text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-brand-purple/90 transition-colors"
        >
          <ArrowLeft size={18} />
          View All Services
        </Link>
      </div>
    );
  }

  const otherServices = servicesData.filter(s => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <section 
        className="relative py-12 md:py-16 bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundLavender})`,
        }}
      >
        <div className="absolute inset-0 bg-brand-purple/40 backdrop-blur-[1px] z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-sm text-white/80 mb-3">
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight size={14} />
            <Link to="/services" className="hover:underline">Services</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">{service.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold drop-shadow-md mb-2">
            {service.title}
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10">
          
          {/* Main Detail Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Service Main Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="h-64 sm:h-80 relative overflow-hidden bg-gray-100">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-brand-purple/90 text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-2 backdrop-blur-sm">
                    Holistic Service
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold">{service.title}</h2>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-serif text-brand-purple font-semibold mb-3">Overview</h3>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                    {service.overview}
                  </p>
                </div>

                {/* Service Types / Varieties */}
                {service.types && service.types.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-serif text-brand-purple font-semibold mb-4">Available Types & Techniques</h3>
                    <div className="grid gap-4">
                      {service.types.map((type, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <h4 className="font-semibold text-brand-purple text-base mb-1 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-brand-green" />
                            {type.name}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed pl-6">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pricing & Duration Options */}
                {service.pricing && service.pricing.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-serif text-brand-purple font-semibold mb-4">Pricing & Duration</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {service.pricing.map((price, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-purple-50/60 p-4 rounded-xl border border-purple-100">
                          <span className="text-gray-800 font-medium text-sm flex items-center gap-2">
                            <Clock size={16} className="text-brand-purple" />
                            {price.duration || price.name || 'Standard Session'}
                          </span>
                          <span className="font-bold text-brand-purple text-lg">{price.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Packages */}
                {service.packages && service.packages.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-serif text-brand-purple font-semibold mb-4">Value Packages</h3>
                    <div className="grid gap-3">
                      {service.packages.map((pkg, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-brand-purple/10 to-green-50 p-4 rounded-xl border border-brand-purple/20">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-900">{pkg.name}</span>
                            <span className="text-brand-purple font-bold text-lg">{pkg.price}</span>
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

                {/* Additional Options */}
                {service.additionalOptions && service.additionalOptions.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-xl font-serif text-brand-purple font-semibold mb-4">Additional Options</h3>
                    <div className="grid gap-3">
                      {service.additionalOptions.map((opt, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                          <div>
                            <span className="text-gray-800 font-medium">{opt.name}</span>
                            {opt.savings && <p className="text-xs text-brand-purple font-medium mt-0.5">{opt.savings}</p>}
                          </div>
                          <span className="font-bold text-brand-purple text-lg">{opt.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Action Button */}
                <div className="pt-6 border-t border-gray-100">
                  <button
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 text-lg"
                  >
                    <Calendar size={22} />
                    Book Appointment for {service.title}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Booking Box */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
              <ShieldCheck size={36} className="text-brand-purple mx-auto mb-3" />
              <h3 className="text-xl font-serif text-brand-purple font-bold mb-2">Ready to Schedule?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Book your session online or call our clinic directly for personalized consultation guidance.
              </p>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold py-3 px-6 rounded-full shadow transition-all flex items-center justify-center gap-2 text-base mb-3"
              >
                <Calendar size={18} />
                Book Now
              </button>
              <p className="text-xs text-gray-500">
                Or call us: <a href="tel:7242849162" className="text-brand-purple font-semibold hover:underline">(724) 284-9162</a>
              </p>
            </div>

            {/* Other Services Sidebar List */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-serif text-brand-purple font-bold mb-4 pb-2 border-b border-gray-100">
                Explore Other Services
              </h3>
              <div className="space-y-3">
                {otherServices.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-purple-50 transition-colors text-gray-700 hover:text-brand-purple text-sm font-medium group"
                  >
                    <span className="line-clamp-1">{item.title}</span>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-purple group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <Link to="/services" className="text-brand-purple text-sm font-semibold hover:underline flex items-center justify-center gap-1">
                  View All 12 Services <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingForm
          service={service}
          onClose={() => setIsBookingOpen(false)}
          onSuccess={() => setShowSuccess(true)}
        />
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-serif text-gray-900 mb-2 font-bold">Booking Request Sent!</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Thank you for scheduling <strong>{service.title}</strong>. We will contact you shortly to confirm your appointment time.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-brand-purple hover:bg-brand-purple/90 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
