// src/pages/VendorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Package, Plus, Edit, Trash2, DollarSign, TrendingUp, ShoppingBag, Eye } from 'lucide-react';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    // Mock data - replace with actual API call
    setProducts([
      {
        id: 1,
        name: 'Classic White Shirt',
        price: 49.99,
        category: 'shirts',
        stock: 10,
        sales: 45,
        revenue: 2249.55,
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400'
      },
      {
        id: 2,
        name: 'Black Denim Jeans',
        price: 79.99,
        category: 'pants',
        stock: 15,
        sales: 32,
        revenue: 2559.68,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400'
      }
    ]);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const stats = {
    totalProducts: products.length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0),
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    lowStock: products.filter(p => p.stock < 5).length
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={20} /> },
    { id: 'products', label: 'My Products', icon: <Package size={20} /> },
    { id: 'add', label: 'Add Product', icon: <Plus size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Vendor Dashboard</h1>
          <p className="text-gray-400">{user?.storeName || 'My Store'}</p>
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

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="text-blue-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalProducts}</div>
                <div className="text-gray-400 text-sm">Total Products</div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="text-green-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalSales}</div>
                <div className="text-gray-400 text-sm">Total Sales</div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="text-yellow-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${stats.totalRevenue.toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm">Total Revenue</div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="text-red-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.lowStock}</div>
                <div className="text-gray-400 text-sm">Low Stock Items</div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Recent Products</h2>
              <div className="space-y-3">
                {products.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-3 bg-black rounded-lg">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{product.name}</h3>
                      <p className="text-gray-400 text-sm">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">${product.revenue.toFixed(2)}</div>
                      <div className="text-gray-400 text-sm">{product.stock} in stock</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">My Products</h2>
              <button
                onClick={() => setActiveTab('add')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <span className="text-gray-400">Price:</span>
                        <span className="text-white ml-2">${product.price}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Stock:</span>
                        <span className={`ml-2 ${product.stock < 5 ? 'text-red-500' : 'text-white'}`}>
                          {product.stock}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Sales:</span>
                        <span className="text-white ml-2">{product.sales}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Revenue:</span>
                        <span className="text-white ml-2">${product.revenue.toFixed(0)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-black border border-gray-800 text-white rounded hover:bg-gray-800 transition">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-900 bg-opacity-30 border border-red-700 text-red-500 rounded hover:bg-opacity-50 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    placeholder="Describe your product"
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Price ($)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Stock Quantity</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600">
                    <option value="">Select category</option>
                    <option value="shirts">Shirts</option>
                    <option value="pants">Pants</option>
                    <option value="dresses">Dresses</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="shoes">Shoes</option>
                    <option value="activewear">Activewear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                  />
                </div>

                <button className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;