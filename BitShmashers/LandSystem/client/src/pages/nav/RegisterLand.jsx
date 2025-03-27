import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  MapPin, 
  Ruler, 
  DollarSign, 
  FileText, 
  Upload, 
  AlertCircle, 
  CheckCircle2,
  Building2,
  ArrowLeft
} from 'lucide-react';

const RegisterLand = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    landTitle: '',
    landType: '',
    area: '',
    location: '',
    description: '',
    price: '',
    documents: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const landTypes = [
    'Agricultural',
    'Residential',
    'Commercial',
    'Industrial',
    'Mixed Use',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documents: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!formData.landTitle || !formData.landType || !formData.area || !formData.location || !formData.price) {
        setError('Please fill in all required fields');
        return;
      }

      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        setError('Please login to register land');
        return;
      }

      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'documents' && formData[key]) {
          submitData.append('documents', formData[key]);
        } else if (key !== 'documents') {
          submitData.append(key, formData[key]);
        }
      });
      console.log(submitData);
      const response = await fetch('http://localhost:8001/api/land/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register land');
      }

      setSuccess('Land registered successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message || 'An error occurred while registering the land');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Landmark className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Register New Land</h1>
          <p className="text-lg text-gray-600">Fill in the details to register your land property</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span>Land Title *</span>
                </label>
                <input
                  type="text"
                  name="landTitle"
                  value={formData.landTitle}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter land title"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Building2 className="w-5 h-5 text-blue-500" />
                  <span>Land Type *</span>
                </label>
                <select
                  name="landType"
                  value={formData.landType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select Land Type</option>
                  {landTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <Ruler className="w-5 h-5 text-blue-500" />
                  <span>Area (sq ft) *</span>
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter area"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-gray-700 font-medium">
                  <DollarSign className="w-5 h-5 text-blue-500" />
                  <span>Price *</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Location *</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter land description"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-gray-700 font-medium">
                <Upload className="w-5 h-5 text-blue-500" />
                <span>Documents</span>
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Drag and drop your documents here</p>
                  <p className="text-sm text-gray-500 mt-2">or click to browse</p>
                </label>
              </div>
              {formData.documents && (
                <p className="text-sm text-gray-600 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Selected file: {formData.documents.name}</span>
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Register Land</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLand;
