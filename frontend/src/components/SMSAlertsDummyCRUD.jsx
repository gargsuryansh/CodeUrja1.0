import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SMSAlertsDummyCRUD() {
  const [recipients, setRecipients] = useState([]);
  const [editRecipientId, setEditRecipientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recipientData, setRecipientData] = useState({ name: '', phoneNumber: '' });
  const [error, setError] = useState(null);

  // Fetch recipients on component mount
  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/sms-alerts/recipients');
      setRecipients(response.data);
    } catch (err) {
      setError('.');
      
    }
  };

  const handleInputChange = (e) => {
    setRecipientData({ ...recipientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!recipientData.name || !recipientData.phoneNumber) {
      alert('Please enter both name and phone number.');
      return;
    }

    setLoading(true);
    try {
      if (editRecipientId) {
        // Update recipient
        await axios.put(`http://localhost:3000/api/sms-alerts/recipients/${editRecipientId}`, recipientData);
        setRecipients(
          recipients.map((r) => (r._id === editRecipientId ? { ...r, ...recipientData } : r))
        );
        setEditRecipientId(null);
      } else {
        // Add new recipient
        const response = await axios.post('http://localhost:3000/api/sms-alerts/recipients', recipientData);
        setRecipients([...recipients, response.data]);
      }
      setRecipientData({ name: '', phoneNumber: '' });
    } catch (err) {
      setError('.');
     
    } finally {
      setLoading(false);
    }
  };

  const handleEditRecipient = (recipient) => {
    setEditRecipientId(recipient._id);
    setRecipientData({ name: recipient.name, phoneNumber: recipient.phoneNumber });
  };

  const handleDeleteRecipient = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this recipient?')) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/sms-alerts/recipients/${_id}`);
      setRecipients(recipients.filter((r) => r._id !== _id));
    } catch (err) {
      setError('.');
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Emergency SMS Recipients
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Input Fields */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {editRecipientId ? 'Edit Recipient' : 'Add New Recipient'}
          </h3>
          <input
            type="text"
            name="name"
            value={recipientData.name}
            onChange={handleInputChange}
            placeholder="Recipient Name"
            className="border rounded-md p-2 w-full mb-2"
          />
          <input
            type="text"
            name="phoneNumber"
            value={recipientData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border rounded-md p-2 w-full mb-2"
          />
          <button
            onClick={handleSubmit}
            className={`py-2 px-4 rounded-md w-full text-white ${
              loading ? 'bg-gray-400' : editRecipientId ? 'bg-blue-500 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : editRecipientId ? 'Update Recipient' : 'Add Recipient'}
          </button>
        </div>

        {/* Recipients List */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recipients List</h3>
          {recipients.length === 0 ? (
            <p className="text-gray-600 text-center">No recipients added yet.</p>
          ) : (
            <ul className="space-y-2">
              {recipients.map((r) => (
                <li key={r._id} className="border rounded-md p-3 text-gray-700 flex justify-between items-center">
                  <span>{r.name} ({r.phoneNumber})</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditRecipient(r)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-3 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRecipient(r._id)}
                      className="bg-red-500 hover:bg-red-700 text-white py-2 px-3 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SMSAlertsDummyCRUD;
