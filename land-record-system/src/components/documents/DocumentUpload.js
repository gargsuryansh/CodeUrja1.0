import React, { useState, useRef } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const DocumentUpload = ({ onUploadComplete }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    documentType: 'sale_deed',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size exceeds 10MB limit');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    if (!formData.title) {
      setError('Please enter a document title');
      return;
    }
    
    setIsUploading(true);
    setError('');
    
    try {
      // Create form data for file upload
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('title', formData.title);
      uploadData.append('documentType', formData.documentType);
      uploadData.append('description', formData.description);
      
      // Upload to server
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: uploadData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload document');
      }
      
      // Call the callback with document info
      if (onUploadComplete) {
        onUploadComplete({
          id: data.documentId,
          title: formData.title,
          documentType: formData.documentType,
          description: formData.description,
          fileUrl: data.fileUrl,
          fileHash: data.fileHash
        });
      }
      
      // Reset form
      setFile(null);
      setFormData({
        title: '',
        documentType: 'sale_deed',
        description: ''
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message || 'Document upload failed');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <Input
          label="Document Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter document title"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="sale_deed">Sale Deed</option>
          <option value="gift_deed">Gift Deed</option>
          <option value="will">Will</option>
          <option value="mutation_order">Mutation Order</option>
          <option value="partition_deed">Partition Deed</option>
          <option value="power_of_attorney">Power of Attorney</option>
          <option value="lease_deed">Lease Deed</option>
          <option value="mortgage_deed">Mortgage Deed</option>
          <option value="revenue_record">Revenue Record</option>
          <option value="court_decree">Court Decree</option>
          <option value="land_map">Land Map</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="mb-4">
        <Input
          label="Description (Optional)"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter document description"
        />
      </div>
      
      <div className="mt-4 mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.tiff,.doc,.docx"
        />
        
        <div 
          onClick={handleSelectFile}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {file ? (
            <div>
              <span className="text-blue-600 font-medium">{file.name}</span>
              <span className="block text-gray-500 text-sm mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ) : (
            <div>
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mt-1 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, JPEG, PNG, TIFF, DOC, DOCX up to 10MB
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Button
        onClick={handleUpload}
        disabled={isUploading || !file}
        fullWidth
      >
        {isUploading ? 'Uploading...' : 'Upload Document'}
      </Button>
    </div>
  );
};

export default DocumentUpload;
