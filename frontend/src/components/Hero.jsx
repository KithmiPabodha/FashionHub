// src/components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 rounded-full backdrop-blur-sm border border-white border-opacity-20">
              <Sparkles size={16} className="text-white" />
              <span className="text-sm">New Collection 2024</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Style That
              <br />
              <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
                Speaks Volumes
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-lg">
              Discover our curated collection of premium clothing. From timeless classics to modern trends, find your perfect style.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                <ShoppingBag size={20} />
                Shop Now
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/products?category=new"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                View Collection
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-gray-400">Vendors</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-gray-400">Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Grid */}
          <div className="hidden md:block relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition transform hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400"
                    alt="Fashion 1"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition transform hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"
                    alt="Fashion 2"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition transform hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"
                    alt="Fashion 3"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-500 transition transform hover:scale-105">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400"
                    alt="Fashion 4"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-20 fill-black">
          <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;