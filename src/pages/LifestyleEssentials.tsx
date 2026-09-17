import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, Star } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Organic Bamboo Tea Set",
    price: 49.99,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Tea & Wellness",
    description: "Complete tea ceremony set made from sustainable bamboo.",
    tags: ["eco-friendly", "tea ceremony", "bamboo"],
    inStock: true
  },
  {
    id: 2,
    name: "Meditation Cushion Set",
    price: 79.99,
    rating: 4.9,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Meditation",
    description: "Ergonomic meditation cushion set with natural cotton covers.",
    tags: ["meditation", "comfort", "ergonomic"],
    inStock: true
  },
  {
    id: 3,
    name: "Crystal Healing Kit",
    price: 89.99,
    rating: 4.7,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Energy Work",
    description: "Curated collection of healing crystals with guide book.",
    tags: ["crystals", "healing", "spiritual"],
    inStock: true
  },
  {
    id: 4,
    name: "Aromatherapy Diffuser",
    price: 64.99,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1544013836-0be22ed6b7f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Aromatherapy",
    description: "Ceramic essential oil diffuser with ambient lighting.",
    tags: ["aromatherapy", "home", "relaxation"],
    inStock: true
  },
  {
    id: 5,
    name: "Yoga Mat Bundle",
    price: 94.99,
    rating: 4.9,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Yoga",
    description: "Premium cork yoga mat with carrying strap and blocks.",
    tags: ["yoga", "eco-friendly", "cork"],
    inStock: false
  },
  {
    id: 6,
    name: "Mindfulness Journal",
    price: 29.99,
    rating: 4.6,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Mindfulness",
    description: "Guided mindfulness journal with daily prompts and exercises.",
    tags: ["mindfulness", "journaling", "self-care"],
    inStock: true
  }
];

const categories = ["All", "Tea & Wellness", "Meditation", "Energy Work", "Aromatherapy", "Yoga", "Mindfulness"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rating", "Most Reviews"];

export const LifestyleEssentials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter(product => selectedCategory === "All" || product.category === selectedCategory)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Best Rating":
          return b.rating - a.rating;
        case "Most Reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-brand-purple mb-4">Lifestyle Essentials</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our collection of mindfully curated lifestyle products designed to enhance your daily wellness routine.
        </p>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter size={20} />
            Filters
          </button>
          <div className="relative group inline-block text-left">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <SlidersHorizontal size={20} />
              Sort by: {sortBy}
              <ChevronDown size={16} />
            </button>
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block z-10">
              <div className="py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === category
                  ? 'bg-brand-purple text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <span className="text-sm text-gray-600">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              {!product.inStock && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Out of Stock
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <span className="text-xl font-bold text-brand-purple">${product.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                disabled={!product.inStock}
                className={`w-full py-2 px-4 rounded-full ${
                  product.inStock
                    ? 'bg-brand-purple hover:bg-brand-purple/90 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};