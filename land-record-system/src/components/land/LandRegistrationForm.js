import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import DocumentUpload from '../documents/DocumentUpload';

const LandRegistrationForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    surveyNumber: '',
    khasraNumber: '',
    area: '',
    areaUnit: 'sqm',
    address: '',
    district: '',
    state: '',
    pincode: '',
    landType: 'residential',
    ownerName: session?.user?.name || '',
    ownershipPercentage: 100, // Default full ownership
    boundaries: null,
    geoLocation: null,
    documents: []
  });
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || '' : value
    }));
  };
  
  const handleDocumentUpload = (documentInfo) => {
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, documentInfo]
    }));
  };
  
  const handleRemoveDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };
  
  const handleGeoLocationCapture = () => {
    // In a real app, this would integrate with a map component
    // For demo purposes, we'll simulate capturing coordinates
    setFormData(prev => ({
      ...prev,
      geoLocation: {
        type: 'Point',
        coordinates: [77.2090, 28.6139] // Example coordinates (Delhi)
      },
      boundaries: {
        type: 'Polygon',
        coordinates: [[[77.2080, 28.6130], [77.2100, 28.6130], [77.2100, 28.6150], [77.2080, 28.6150], [77.2080, 28.6130]]]
      }
    }));
    
    setSuccess('Location and boundaries captured successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };
  
  const validateStep1 = () => {
    if (!formData.surveyNumber || !formData.area || !formData.address || 
        !formData.district || !formData.state) {
      setError('Please fill all required fields');
      return false;
    }
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.geoLocation || !formData.boundaries) {
      setError('Please capture the land boundaries');
      return false;
    }
    return true;
  };
  
  const validateStep3 = () => {
    if (formData.documents.length === 0) {
      setError('Please upload at least one document');
      return false;
    }
    return true;
  };
  
  const handleNextStep = () => {
    setError('');
    
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };
  
  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/land/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Registration successful
      router.push(`/land/${data.landId}`);
    } catch (err) {
      setError(err.message || 'Failed to register land. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Land Registration</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step === stepNumber 
                  ? 'border-blue-600 bg-blue-600 text-white' 
                  : step > stepNumber 
                    ? 'border-green-500 bg-green-500 text-white' 
                    : 'border-gray-300 text-gray-500'
              }`}>
                {step > stepNumber ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              
              {stepNumber < 3 && (
                <div className={`flex-1 h-1 ${
                  step > stepNumber ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <div className="flex justify-between mt-2">
          <div className="text-sm font-medium text-gray-500">Land Details</div>
          <div className="text-sm font-medium text-gray-500">Location</div>
          <div className="text-sm font-medium text-gray-500">Documents</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Survey Number"
                id="surveyNumber"
                name="surveyNumber"
                value={formData.surveyNumber}
                onChange={handleChange}
                placeholder="Enter survey number"
                required
              />
              
              <Input
                label="Khasra Number"
                id="khasraNumber"
                name="khasraNumber"
                value={formData.khasraNumber}
                onChange={handleChange}
                placeholder="Enter khasra number"
              />
              
              <div className="flex space-x-2">
                <Input
                  label="Area"
                  type="number"
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter land area"
                  required
                  className="flex-1"
                />
                
                <div className="w-1/3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    name="areaUnit"
                    value={formData.areaUnit}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sqft">Square Feet</option>
                    <option value="sqm">Square Meters</option>
                    <option value="acre">Acres</option>
                    <option value="hectare">Hectares</option>
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  required
                />
              </div>
              
              <Input
                label="District"
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter district"
                required
              />
              
              <Input
                label="State"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
              
              <Input
                label="PIN Code"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter PIN code"
                maxLength={6}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land Type</label>
                <select
                  name="landType"
                  value={formData.landType}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="agricultural">Agricultural</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button onClick={handleNextStep}>
                Next: Location
              </Button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Land Location & Boundaries</h3>
              <p className="text-gray-600 mb-4">
                Use the map to mark the exact location and boundaries of your land. This will help in creating a digital record with geospatial data.
              </p>
              
              <div className="h-64 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                {/* In a real app, this would be a Map component */}
                <div className="text-center">
                  <p className="text-gray-600 mb-2">Map Component Placeholder</p>
                  <Button variant="secondary" onClick={handleGeoLocationCapture}>
                    Capture Location & Boundaries
                  </Button>
                </div>
              </div>
              
              {formData.geoLocation && formData.boundaries && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800">Location Captured</h4>
                  <p className="text-sm text-green-600">
                    Coordinates: {formData.geoLocation.coordinates[0]}, {formData.geoLocation.coordinates[1]}
                  </p>
                  <p className="text-sm text-green-600">
                    Total vertices in boundary: {formData.boundaries.coordinates[0].length}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back: Land Details
              </Button>
              <Button onClick={handleNextStep}>
                Next: Documents
              </Button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
              <p className="text-gray-600 mb-4">
                Please upload all relevant documents for land registration. Documents will be securely stored with tamper-proof verification.
              </p>
              
              <DocumentUpload onUploadComplete={handleDocumentUpload} />
              
              {formData.documents.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Uploaded Documents</h4>
                  <ul className="space-y-2">
                    {formData.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-gray-500">{doc.documentType}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>
                Back: Location
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Submit Registration'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Card>
  );
};

export default LandRegistrationForm;
