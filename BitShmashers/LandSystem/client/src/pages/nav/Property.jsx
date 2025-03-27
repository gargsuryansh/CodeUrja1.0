import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  MapPin, 
  DollarSign, 
  BedDouble, 
  Bath, 
  Square, 
  Edit2, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Users,
  Settings,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

const Property = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Modern Downtown plot",
      type: "Apartment",
      location: "123 Main St, City",
      price: "$2,500",
      bedrooms: 2,
      bathrooms: 2,
      area: "1,200 sq ft",
      status: "Approved",
      image: "https://thumbs.dreamstime.com/b/outdoor-empty-land-sale-thailand-145925723.jpg"
    },
    // Add more sample properties as needed
  ]);

  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="p-6 max-w-7xl mx-auto text-primary dark:text-white mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
          <p className="text-gray-600">Manage and monitor your property portfolio</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Add New Property
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Properties</p>
              <h3 className="text-2xl font-semibold">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Value</p>
              <h3 className="text-2xl font-semibold">$2.4M</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Occupancy Rate</p>
              <h3 className="text-2xl font-semibold">85%</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="text-orange-600" size={24} />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Tenants</p>
              <h3 className="text-2xl font-semibold">24</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter size={20} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Settings size={20} />
              Sort
            </button>
          </div>
        </div>
      </div>

      {/* Property List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-48">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <Edit2 size={18} />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                  {property.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <BedDouble size={16} />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={16} />
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={16} />
                  <span>{property.area}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Property;
