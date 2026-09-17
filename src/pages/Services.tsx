import React, { useState } from 'react';
import { ChevronDown, Calendar, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import serviceMassageImage from '../../assets/Service_Massage.png';

const services = [
  {
    title: "Massage Therapy / Reflexology",
    overview: "Offers various therapeutic massage techniques to relieve stress, tension, and pain while promoting circulation and overall relaxation.",
    types: [
      {
        name: "Swedish",
        description: "Soothing and relaxing massage to relieve stress, ease tension, increase circulation, and calm the body."
      },
      {
        name: "Deep Tissue Therapeutic",
        description: "Targets muscle knots; increases circulation, lymphatic flow, mobility, and provides pain relief."
      },
      {
        name: "Hot Stone",
        description: "Uses heated stones to stimulate circulation, relieve knots and stiff muscles, and relax the entire body with warmth and energy."
      },
      {
        name: "Reflexology (Zone Therapy)",
        description: "Applies pressure to specific reflex points on the feet that correspond to organs and glands to relieve tension, improve circulation, and promote natural body function."
      }
    ],
    pricing: [
      { duration: "30 minutes", price: "$45" },
      { duration: "60 minutes", price: "$75" }
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "massage"
  },
  {
    title: "Far Infrared Sauna",
    overview: "A relaxing sauna session designed to detoxify, aid weight loss, and naturally relieve inflammation and pain.",
    pricing: [
      { duration: "30 minutes", price: "$30" }
    ],
    packages: [
      { name: "4-session package", price: "$90", savings: "Save $30" }
    ],
    image: "https://images.unsplash.com/photo-1554344056-47143485e1fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "sauna"
  },
  {
    title: "Thermography Scans",
    overview: "Digital Infrared Thermal Imaging by Three Rivers Thermography of Pittsburgh— a non-invasive, FDA-approved clinical procedure (with no radiation) to detect and monitor diseases (especially breast cancer) up to 8-10 years before mammography.",
    pricing: [
      { name: "Scan", price: "$225" },
      { name: "Scan Review by Dr. Lisa Kellerman, ND Naturopathic Doctor", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "thermography"
  },
  {
    title: "Bioenergetic Testing – ZYTO Whole Body Scan",
    overview: "Utilizes the LSA PRO computerized scanner via a hand-held cradle. It assesses the body for allergies or energy blockages through galvanic skin response testing (similar to a lie detector test). Includes a program appointment and health evaluation.",
    pricing: [
      { duration: "30 minutes", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "bioenergetic"
  },
  {
    title: "Allergy Elimination with N.A.E.T.",
    overview: "Uses Nambrudipad's allergy elimination technique via acupressure on the spine while the client holds a vial containing the allergen. (Note: An allergy scan must be completed first to identify both food and environmental allergies.)",
    pricing: [
      { duration: "30-minute session", price: "$80" }
    ],
    additionalOptions: [
      { name: "N.A.E.T. Rescan", price: "$129" },
      { name: "N.A.E.T. Allergy Elimination Package (17 treatments, Prepaid only)", price: "$1,200", savings: "Save $160" }
    ],
    image: "https://images.unsplash.com/photo-1512069766972-4b3202a5927f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "naet"
  },
  {
    title: "Harmonic Wave Energy Balancing",
    overview: "An energy balancing treatment using broadband and E-fields to destroy pathogens and accelerate the body's repair process, customized for specific ailments.",
    pricing: [
      { duration: "30 minutes or less", price: "$30" },
      { duration: "60 minutes", price: "$40" }
    ],
    image: "https://images.unsplash.com/photo-1598901865264-4f7235e5fd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "harmonic-wave"
  },
  {
    title: "Colon Hydrotherapy",
    overview: "A gentle, warm colon irrigation to remove old fecal matter, retrain bowel function, and promote regular, healthy bowel movements (2-3 per day).",
    pricing: [
      { duration: "60 minutes", price: "$99" }
    ],
    packages: [
      { name: "3-session package", price: "$275", bonus: "Includes a complimentary sauna session" }
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "colon-hydrotherapy"
  },
  {
    title: "Ionic Detox Foot Soak",
    overview: "A one-hour session that includes an ionic detox foot soak combined with an essential oil cream application for a refreshing detox.",
    pricing: [
      { duration: "60 minutes", price: "$80" }
    ],
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "ionic-detox"
  },
  {
    title: "Ear Candling",
    overview: "A painless method to remove excess ear wax, relieve water or itchiness in the ears, and alleviate sinus pressure.",
    pricing: [
      { duration: "60 minutes", price: "$125" }
    ],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "ear-candling"
  },
  {
    title: "Paraffin Hand Dip",
    overview: "A soothing and warm hand treatment that exfoliates, relieves pain, and conditions the skin.",
    pricing: [
      { name: "Single treatment", price: "$10" }
    ],
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "paraffin"
  },
  {
    title: "Bloodwork Review",
    pricing: [
      { price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "bloodwork"
  },
  {
    title: "Hormone Test Review",
    overview: "A comprehensive review of hormone test results to help guide your wellness plan.",
    pricing: [
      { duration: "30 minutes", price: "$149" }
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    consultationType: "hormone"
  }
];

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Booking Successful!</h3>
          <p className="text-gray-600">
            Booking request submitted successfully! We will contact you shortly to confirm your appointment.
          </p>
          <button
            onClick={onClose}
            className="mt-6 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full inline-flex items-center justify-center transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

interface BookingFormProps {
  service: typeof services[0];
  onClose: () => void;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ service, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: service.types ? service.types[0].name : service.title,
    duration: service.pricing ? service.pricing[0].duration : '30 minutes',
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
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
                  {service.pricing.map((price) => (
                    <option key={price.duration} value={price.duration}>
                      {price.duration} - {price.price}
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
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple h-32"
              placeholder="Any specific concerns or requests..."
            />
          </div>

          {message && (
            <div className="p-4 rounded-lg bg-red-50 text-red-700">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
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
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccessMessage(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${serviceMassageImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Experience the transformative power of holistic healing through our comprehensive wellness services
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {services.map((service) => (
              <div 
                key={service.title}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div 
                  className="cursor-pointer"
                  onClick={() => setExpandedService(expandedService === service.title ? null : service.title)}
                >
                  <div className="flex items-center justify-between p-6">
                    <h2 className="text-2xl font-serif text-brand-purple">{service.title}</h2>
                    <ChevronDown 
                      size={24} 
                      className={`text-brand-purple transition-transform ${
                        expandedService === service.title ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {expandedService === service.title && (
                  <div className="px-6 pb-6">
                    {service.overview && (
                      <p className="text-gray-700 mb-6">{service.overview}</p>
                    )}

                    {service.types && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Available Types:</h3>
                        <div className="grid gap-4">
                          {service.types.map((type) => (
                            <div key={type.name} className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-brand-purple mb-2">{type.name}</h4>
                              <p className="text-gray-600">{type.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      {service.pricing && service.pricing.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Pricing:</h3>
                          <div className="grid gap-2">
                            {service.pricing.map((price, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                                <span>{price.duration || price.name || 'Single Session'}</span>
                                <span className="font-semibold text-brand-purple">{price.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {service.packages && (
                        <div>
                          <h3 className="text-lg font-semibold mb-3">Packages:</h3>
                          <div className="grid gap-2">
                            {service.packages.map((pkg, index) => (
                              <div key={index} className="bg-brand-purple/10 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">{pkg.name}</span>
                                  <span className="text-brand-purple font-bold">{pkg.price}</span>
                                </div>
                                {(pkg.savings || pkg.bonus) && (
                                  <p className="text-sm text-brand-purple">
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
                          <h3 className="text-lg font-semibold mb-3">Additional Options:</h3>
                          <div className="grid gap-2">
                            {service.additionalOptions.map((option, index) => (
                              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span>{option.name}</span>
                                  <span className="font-semibold text-brand-purple">{option.price}</span>
                                </div>
                                {option.savings && (
                                  <p className="text-sm text-brand-purple">{option.savings}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="mt-6 w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full inline-flex items-center justify-center text-lg transition-colors"
                    >
                      <Calendar className="mr-2" size={20} />
                      Book Appointment
                    </button>
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
}