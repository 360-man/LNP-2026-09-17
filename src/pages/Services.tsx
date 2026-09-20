import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';
import serviceMassageImage from '../../assets/Service_Massage.png';

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Banner Section */}
      <section 
        className="relative py-12 md:py-16 bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${serviceMassageImage})`,
        }}
      >
        <div className="absolute inset-0 bg-brand-purple/50 backdrop-blur-[1px] z-10"></div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold drop-shadow-md mb-3">Our Services</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
            Explore our wide range of natural health services. Click Learn More to view full details, pricing, and appointment options for each service.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      {/*
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-purple font-bold mb-4">
              Comprehensive Holistic Care
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
              Explore our wide range of natural health services and click Learn More to view full details, pricing, and appointment options for each service.
            </p>
          </div>
          */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-[100px]">
            {servicesData.map((service) => (
              <div 
                key={service.slug}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="h-48 overflow-hidden relative bg-gray-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <h2 className="absolute bottom-3 left-4 right-4 text-lg font-serif text-white font-bold leading-snug drop-shadow-md">
                      <Link to={`/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </h2>
                  </div>

                  {/* Card Description */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {service.overview}
                    </p>
                  </div>
                </div>

                {/* Card Learn More Action Button */}
                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/services/${service.slug}`}
                    className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white px-5 py-3 rounded-full inline-flex items-center justify-center text-sm font-semibold transition-all shadow-md group-hover:shadow-lg gap-1.5"
                  >
                    Learn More
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
