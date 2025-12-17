// src/pages/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, User, Heart, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Mock data - replace with actual API calls
    setOrders([
      {
        id: 'ORD-001',
        date: '2024-12-10',
        status: 'delivered',
        total: 129.98,
        items: [
          { name: 'Classic White Shirt', quantity: 2, price: 49.99 },
          { name: 'Black Denim Jeans', quantity: 1, price: 79.99 }
        ]
      },
      {
        id: 'ORD-002',
        date: '2024-12-15',
        status: 'processing',
        total: 59.99,
        items: [
          { name: 'Gray Hoodie', quantity: 1, price: 59.99 }
        ]
      }
    ]);

    setWishlist([
      {
        id: 1,
        name: 'Leather Jacket',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
      }
    ]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'processing':
        return <Clock className="text-yellow-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Package className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500 bg-green-900 bg-opacity-30 border-green-700';
      case 'processing':
        return 'text-yellow-500 bg-yellow-900 bg-opacity-30 border-yellow-700';
      case 'cancelled':
        return 'text-red-500 bg-red-900 bg-opacity-30 border-red-700';
      default:
        return 'text-gray-500 bg-gray-900 bg-opacity-30 border-gray-700';
    }
  };

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={20} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-8 border-b border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package size={64} className="mx-auto text-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                  <p className="text-gray-400">Start shopping to see your orders here</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">Order #{order.id}</h3>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Placed on {order.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">${order.total.toFixed(2)}</div>
                        <button className="text-sm text-gray-400 hover:text-white transition mt-1">
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-t border-gray-800 pt-2">
                          <span className="text-gray-400">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>
                <button className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-16">
                  <Heart size={64} className="mx-auto text-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No items in wishlist</h3>
                  <p className="text-gray-400">Save your favorite items here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                        <p className="text-2xl font-bold text-white mb-4">${item.price}</p>
                        <button className="w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4 max-w-2xl">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold mb-1">Home</h3>
                    <p className="text-gray-400 text-sm">
                      123 Fashion Street<br />
                      Style City, SC 12345<br />
                      United States
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-white transition text-sm">Edit</button>
                    <button className="text-red-500 hover:text-red-400 transition text-sm">Delete</button>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-900 bg-opacity-30 border border-green-700 rounded text-green-500 text-xs w-fit">
                  Default
                </div>
              </div>

              <button className="w-full py-3 bg-gray-900 border border-gray-800 text-white rounded-lg hover:bg-gray-800 transition">
                + Add New Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;