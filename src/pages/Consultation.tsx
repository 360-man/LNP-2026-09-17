import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, AlertCircle, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

type ConsultationType = 'initial' | 'followup' | 'focused';
type TimeSlot = {
  time: string;
  available: boolean;
};

const consultationTypes = [
  {
    type: 'initial',
    title: 'Health Evaluation',
    duration: '60 minutes',
    price: 278,
    description: 'A comprehensive first visit to discuss your health history, current concerns, and create a personalized wellness plan.\nYou\'ll receive a take-home test to perform and return back approximately 2 weeks later for review.\n(Can be done via phone if needed for long distance clients)'
  },
  {
    type: 'focused',
    title: 'Focused Ailment Consultation',
    subtitle: 'Dr. Lisa Kellerman, N.D. Naturopathic Doctor',
    duration: '30 minutes',
    price: 149,
    description: 'A dedicated session to discuss one specific ailment OR to review Lab test results and suggest changes if necessary.'
  },
  {
    type: 'followup',
    title: 'Focused Ailment Consultation',
    subtitle: 'Jennifer Stoepfel, Certified Nurse Practitioner',
    duration: '60 minutes',
    price: 249,
    description: 'A dedicated session to discuss one specific ailment.',
    followUp: {
      duration: '30 minutes',
      price: 149,
      description: 'A follow-up session to review progress and adjust treatment plans as needed.',
      title: 'Follow-up Consultation with Jennifer Stoepfel'
    }
  }
];

const availableTimeSlots: TimeSlot[] = [
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true }
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

export function Consultation() {
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concerns: ''
  });

  // Get the selected consultation type details
  const getSelectedConsultationDetails = () => {
    const consultation = consultationTypes.find(c => c.type === selectedType);
    if (!consultation) return null;

    // Handle follow-up consultation
    if (selectedType === 'followup' && consultation.followUp) {
      return {
        title: consultation.followUp.title,
        duration: consultation.followUp.duration,
        price: consultation.followUp.price
      };
    }

    return {
      title: consultation.title,
      duration: consultation.duration,
      price: consultation.price
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const consultationDetails = getSelectedConsultationDetails();
    if (!consultationDetails) return;

    try {
      const { error } = await supabase
        .from('service_bookings')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.concerns,
          service_title: consultationDetails.title,
          service_type: selectedType,
          duration: consultationDetails.duration,
          price: consultationDetails.price,
          preferred_date: selectedDate,
          preferred_time: selectedTime,
          status: 'new'
        }]);

      if (error) throw error;

      setShowSuccessMessage(true);
      setShowBookingForm(false);
      setFormData({ name: '', email: '', phone: '', concerns: '' });
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      console.error('Booking error:', error);
    }
  };

  if (showBookingForm) {
    const consultationDetails = getSelectedConsultationDetails();
    if (!consultationDetails) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-serif text-brand-purple">{consultationDetails.title}</h2>
                <p className="text-gray-600 mt-2">
                  Duration: {consultationDetails.duration} • Price: ${consultationDetails.price}
                </p>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        !slot.available
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'bg-brand-purple text-white'
                          : 'bg-gray-50 hover:bg-brand-purple/10'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <User size={18} className="inline mr-2" />
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
                    <Mail size={18} className="inline mr-2" />
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
                    <Phone size={18} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <MessageSquare size={18} className="inline mr-2" />
                    Health Concerns
                  </label>
                  <textarea
                    value={formData.concerns}
                    onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple h-32"
                    placeholder="Please briefly describe your main health concerns..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-brand-purple text-white rounded-full hover:bg-brand-purple/90 transition-colors"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-brand-purple mb-6">Book a Consultation</h1>
          <p className="text-xl text-gray-600">
            Take the first step towards optimal health with a personalized consultation
          </p>
        </div>

        {/* Consultation Types */}
        <div className="grid md:grid-cols-2 gap-6">
          {consultationTypes.map((consultation) => (
            <div
              key={consultation.type + consultation.title + consultation.duration}
              className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-brand-purple/50 transition-all"
            >
              <h3 className="text-xl font-semibold mb-1">{consultation.title}</h3>
              {consultation.subtitle && (
                <p className="text-sm text-gray-600 mb-4">{consultation.subtitle}</p>
              )}
              <p className="text-gray-600 text-sm mb-4 whitespace-pre-line">{consultation.description}</p>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Clock size={18} />
                <span>{consultation.duration}</span>
              </div>
              <div className="text-brand-purple font-semibold mb-4">
                ${consultation.price}
              </div>

              {!consultation.followUp && (
                <button
                  onClick={() => {
                    setSelectedType(consultation.type);
                    setShowBookingForm(true);
                  }}
                  className="w-full py-2 px-4 bg-brand-purple text-white rounded-full hover:bg-brand-purple/90 transition-colors"
                >
                  Book Consultation
                </button>
              )}

              {consultation.followUp && (
                <div>
                  <button
                    onClick={() => {
                      setSelectedType(consultation.type);
                      setShowBookingForm(true);
                    }}
                    className="w-full py-2 px-4 bg-brand-purple text-white rounded-full hover:bg-brand-purple/90 transition-colors mb-6"
                  >
                    Book Consultation
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-2">{consultation.followUp.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{consultation.followUp.description}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Clock size={18} />
                      <span>{consultation.followUp.duration}</span>
                    </div>
                    <div className="text-brand-purple font-semibold mb-4">
                      ${consultation.followUp.price}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedType('followup');
                        setShowBookingForm(true);
                      }}
                      className="w-full py-2 px-4 bg-brand-purple/10 text-brand-purple rounded-full hover:bg-brand-purple/20 transition-colors"
                    >
                      Book Follow-up
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Services Card */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif text-brand-purple mb-4">Treat Yourself To Our Services</h2>
            <p className="text-lg text-gray-600 mb-6">
              Explore our comprehensive range of wellness services, from massage therapy to natural healing treatments.
              Discover the perfect combination of services to support your health journey.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-3 rounded-full transition-colors"
            >
              Learn More
              <ChevronRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4">
            <AlertCircle size={24} className="text-brand-purple mt-1" />
            <div>
              <h3 className="text-xl font-serif text-brand-purple mb-2">Important Information</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Please arrive 10 minutes before your scheduled appointment time</li>
                <li>• Bring any relevant medical records or test results</li>
                <li>• 24-hour cancellation notice required</li>
                <li>• Initial consultation fee will be collected at the time of booking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <SuccessMessage onClose={() => setShowSuccessMessage(false)} />
      )}
    </div>
  );
}