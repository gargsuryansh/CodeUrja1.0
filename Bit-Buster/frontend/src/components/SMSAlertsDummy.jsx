import React from 'react';
import SMSAlertsDummyCRUD from './SMSAlertsDummyCRUD';
import Navbarforhome from './Navbarforhome';

 
function SMSAlertsDummy() {
  const dummyRecipients = [
    { id: 1, name: 'John Doe', phoneNumber: '+15551234567' },
    { id: 2, name: 'Jane Smith', phoneNumber: '+15559876543' },
    { id: 3, name: 'David Lee', phoneNumber: '+15551122334' },
  ];

  const dummyAlertMessage = 'Emergency: Severe weather warning! Please stay indoors.';

  const handleSendDummyAlert = () => {
    dummyRecipients.forEach(r => console.log(`Sending SMS to ${r.name} (${r.phoneNumber}): ${dummyAlertMessage}`));
    alert('SMS sent successfully');
  };

  // Website color palette (replace with your actual colors)
  const primaryColor = '#1e40af'; // Example: blue-800
  const primaryHoverColor = '#1d4ed8'; // Example: blue-600
  const secondaryColor = '#dc2626'; // Example: red-600
  const secondaryHoverColor = '#b91c1c'; // Example: red-700

  return (
    <><Navbarforhome />
    <div className="p-8 bg-gray-700 min-h-screen"> 
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Emergency SMS Alerts</h2>
        <p className="mb-6 text-gray-700">
          This is a dummy implementation of emergency SMS alerts. In a real application, you would integrate with an SMS gateway API.
        </p>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recipients</h3>
          <ul className="space-y-2">
            {dummyRecipients.map(r => (
              <li key={r.id} className="border rounded-md p-3 text-gray-700">
                {r.name} ({r.phoneNumber})
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Alert Message</h3>
          <p className="text-gray-700">{dummyAlertMessage}</p>
        </div>

        <div className="text-center">
          <button
            onClick={handleSendDummyAlert}
            className={`bg-${secondaryColor.slice(1)}-600 hover:bg-${secondaryHoverColor.slice(1)}-700 text-black border border-red-500 py- px-4 rounded-md text-lg`}
          >
            Send Dummy Alerts
          </button>
        </div>
        <div className = "mt-6">
        <SMSAlertsDummyCRUD />
        </div>
      </div>
    </div>
    </>
  );
}

export default SMSAlertsDummy;