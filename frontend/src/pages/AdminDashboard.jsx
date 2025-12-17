// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag, DollarSign, TrendingUp, Ban, Check, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Mock data - replace with actual API calls
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', isActive: true, orders: 5 },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'vendor', isActive: true, storeName: 'Fashion Hub', products: 12 },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'customer', isActive: false, orders: 2 }
    ]);

    setProducts([
      { id: 1, name: 'Classic White Shirt', vendor: 'Fashion Hub', price: 49.99, stock: 10, sales: 45, status: 'active' },
      { id: 2, name: 'Black Denim Jeans', vendor: 'Denim Co', price: 79.99, stock: 15, sales: 32, status: 'active' }
    ]);
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const stats = {
    totalUsers: users.length,
    totalCustomers: users.filter(u => u.role === 'customer').length,
    totalVendors: users.filter(u => u.role === 'vendor').length,
    totalProducts: products.length,
    totalSales: products.reduce((sum, p) => sum + p.sales, 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.sales), 0)
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={20} /> },
    { id: 'users', label: 'Manage Users', icon: <Users size={20} /> },
    { id: 'products', label: 'All Products', icon: <Package size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">System management and oversight</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="text-blue-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stats.totalUsers}</div>
                <div className="text-gray-400 text-sm">Total Users</div>
                <div className="mt-3 pt-3 border-t border-gray-800 text-sm">
                  <span className="text-gray-400">Customers: </span>
                  <span className="text-white">{stats.totalCustomers}</span>
                  <span className="text-gray-400 ml-3">Vendors: </span>
                  <span className="text-white">{stats.totalVendors}</span>
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="text-purple-500" size={32} />
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

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="text-yellow-500" size={32} />
                </div>
                <div className="text-4xl font-bold text-white mb-1">
                  ${stats.totalRevenue.toFixed(2)}
                </div>
                <div className="text-gray-400 text-sm">Platform Revenue</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-black rounded">
                      <div>
                        <div className="text-white font-semibold">{user.name}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        user.isActive 
                          ? 'bg-green-900 bg-opacity-30 border border-green-700 text-green-500'
                          : 'bg-red-900 bg-opacity-30 border border-red-700 text-red-500'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Top Products</h2>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-black rounded">
                      <div>
                        <div className="text-white font-semibold">{product.name}</div>
                        <div className="text-gray-400 text-sm">{product.vendor}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{product.sales} sales</div>
                        <div className="text-gray-400 text-sm">${product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-gray-600"
                />
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Activity</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-black transition">
                        <td className="px-6 py-4">
                          <div className="text-white font-semibold">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm capitalize">
                            {user.role}
                          </span>
                          {user.storeName && (
                            <div className="text-gray-400 text-sm mt-1">{user.storeName}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center gap-2 ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
                            {user.isActive ? <Check size={16} /> : <Ban size={16} />}
                            <span className="text-sm">{user.isActive ? 'Active' : 'Inactive'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white text-sm">
                            {user.role === 'customer' && `${user.orders} orders`}
                            {user.role === 'vendor' && `${user.products} products`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleUserStatus(user.id)}
                              className={`px-3 py-1 rounded text-sm transition ${
                                user.isActive
                                  ? 'bg-red-900 bg-opacity-30 border border-red-700 text-red-500 hover:bg-opacity-50'
                                  : 'bg-green-900 bg-opacity-30 border border-green-700 text-green-500 hover:bg-opacity-50'
                              }`}
                            >
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black border-b border-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Vendor</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Stock</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Sales</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-black transition">
                        <td className="px-6 py-4">
                          <div className="text-white font-semibold">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{product.vendor}</td>
                        <td className="px-6 py-4 text-white">${product.price}</td>
                        <td className="px-6 py-4">
                          <span className={product.stock < 5 ? 'text-red-500' : 'text-white'}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{product.sales}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700 transition">
                              View
                            </button>
                            <button className="px-3 py-1 bg-red-900 bg-opacity-30 border border-red-700 text-red-500 rounded text-sm hover:bg-opacity-50 transition">
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;