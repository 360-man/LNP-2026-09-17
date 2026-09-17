import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import supplementsImage from '../../assets/Suppliments-Display_NF.jpg';
import waxMeltsImage from '../../assets/Wax-Melts_Scented-Wax.jpg';

const categories = [
  {
    name: "Natural Supplements",
    description: "Discover our premium range of natural supplements, carefully formulated to support your health and wellness journey.",
    image: supplementsImage,
    buttonText: "Shop Supplements"
  },
  {
    name: "Lifestyle Essentials",
    description: "Explore our collection of mindfully curated lifestyle products designed to enhance your daily wellness routine.",
    image: waxMeltsImage,
    buttonText: "Shop Products"
  }
];

export const Shop: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-brand-purple mb-6">Our Collections</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our thoughtfully curated categories, each designed to support your natural wellness journey.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {categories.map((category) => (
          <div 
            key={category.name}
            className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10"/>
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-[500px] object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
              <h2 className="text-4xl font-serif mb-4">{category.name}</h2>
              <p className="text-lg mb-6 text-gray-200">{category.description}</p>
              <Link
                to={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-full transition-colors w-fit"
              >
                {category.buttonText}
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};