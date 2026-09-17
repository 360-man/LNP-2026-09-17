import React from 'react';
import { Award, Users, Heart, Leaf, Calendar, ChevronRight, Radio, Tv, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundLavender from '../../assets/background-Lavender-header.png';
import lisaAtDesk from '../../assets/Lisa_at-desk.jpg';

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundLavender})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">About Lisa's Natural Path</h1>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={lisaAtDesk}
                alt="Dr. Lisa Kellerman"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-serif text-brand-purple mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded by Dr. Lisa Kellerman, N.D., Lisa's Natural Path emerged from a deep-rooted passion 
                for holistic healing and a vision to transform lives through natural medicine. With over two 
                decades of experience in naturopathic care, Dr. Kellerman has created a sanctuary where 
                traditional wisdom meets modern wellness practices.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                From the moment you step into our welcoming space, you're embraced by the warmth of our 
                knowledgeable staff and the comforting ambiance of our state-of-the-art <Link to="/shop" className="text-brand-purple hover:text-brand-purple/80">Herb Shop</Link> and <Link to="/services" className="text-brand-purple hover:text-brand-purple/80">Wellness Center</Link>. Our journey began with a simple mission: to provide comprehensive, natural 
                healthcare solutions that address the root cause of health issues—not just their symptoms.
              </p>
              <Link
                to="/consultation"
                className="inline-flex items-center bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full transition-colors"
              >
                Book a Consultation
                <ChevronRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Media Presence Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-brand-purple text-center mb-16">Media Presence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Radio className="w-12 h-12 text-brand-purple" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-purple">"The Natural Path" Radio Show</h3>
                  <p className="text-gray-600">680 AM WISR</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Join Dr. Kellerman every first Wednesday at 11:15 a.m. for insightful discussions 
                and practical tips on holistic health.
              </p>
              <div className="flex items-center gap-2 text-brand-purple">
                <Clock size={20} />
                <span>Monthly • First Wednesday • 11:15 AM</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <Tv className="w-12 h-12 text-brand-purple" />
                <div>
                  <h3 className="text-xl font-semibold text-brand-purple">"Family Wellness" TV Segment</h3>
                  <p className="text-gray-600">Family Magazine TV</p>
                </div>
              </div>
              <p className="text-gray-700">
                Watch Dr. Kellerman share valuable insights on family wellness and natural health 
                solutions on this upcoming national Christian TV show.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-brand-purple text-center mb-16">Our Commitment to You</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-12 h-12 text-brand-purple" />,
                title: "Holistic Care",
                description: "We believe in treating the whole person, not just symptoms, considering physical, emotional, and spiritual well-being."
              },
              {
                icon: <Leaf className="w-12 h-12 text-brand-purple" />,
                title: "Natural Solutions",
                description: "Our commitment to natural remedies and treatments helps support your body's innate healing abilities."
              },
              {
                icon: <Users className="w-12 h-12 text-brand-purple" />,
                title: "Personalized Approach",
                description: "Every individual is unique, and we tailor our treatments to meet your specific health needs and goals."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-brand-purple mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Notice */}
      <section className="py-12 px-4 bg-brand-purple text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calendar size={24} />
            <h2 className="text-2xl font-serif">By Appointment Only</h2>
          </div>
          <p className="text-lg mb-8">
            Dr. Lisa Kellerman, ND Naturopathic Doctor sees patients by appointment only. 
            Schedule your consultation today to begin your wellness journey.
          </p>
          <Link
            to="/consultation"
            className="inline-flex items-center bg-white text-brand-purple hover:bg-gray-100 px-8 py-4 rounded-full transition-colors"
          >
            <Calendar className="mr-2" size={24} />
            Schedule Your Visit
          </Link>
        </div>
      </section>
    </div>
  );
}