import React, { useState } from "react";

function ReliefManagement() {
  const [camps, setCamps] = useState([]);
  const [resources, setResources] = useState([]);
  const [campName, setCampName] = useState("");
  const [campLocation, setCampLocation] = useState("");
  const [campCapacity, setCampCapacity] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [resourceQuantity, setResourceQuantity] = useState("");
  const [selectedCamp, setSelectedCamp] = useState("");

  // Add a new relief camp
  const addCamp = () => {
    if (!campName || !campLocation || !campCapacity) {
      alert("Please enter all camp details.");
      return;
    }
    const newCamp = { id: Date.now(), name: campName, location: campLocation, capacity: campCapacity };
    setCamps([...camps, newCamp]);
    setCampName("");
    setCampLocation("");
    setCampCapacity("");
  };

  // Add a new resource
  const addResource = () => {
    if (!resourceType || !resourceQuantity || !selectedCamp) {
      alert("Please enter all resource details.");
      return;
    }
    const newResource = { id: Date.now(), type: resourceType, quantity: resourceQuantity, camp: selectedCamp };
    setResources([...resources, newResource]);
    setResourceType("");
    setResourceQuantity("");
    setSelectedCamp("");
  };

  return (
    <div className="min-h-screen  bg-gray-700  flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-red-400 mb-6">Relief Camp & Resource Management</h1>

      {/* Add Relief Camp */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-4">Add Relief Camp</h2>
        <input type="text" placeholder="Camp Name" value={campName} onChange={(e) => setCampName(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <input type="text" placeholder="Location" value={campLocation} onChange={(e) => setCampLocation(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <input type="number" placeholder="Capacity" value={campCapacity} onChange={(e) => setCampCapacity(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <button onClick={addCamp} className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded">Add Camp</button>
      </div>

      {/* Add Resource */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-4">Add Resource</h2>
        <input type="text" placeholder="Resource Type" value={resourceType} onChange={(e) => setResourceType(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <input type="number" placeholder="Quantity" value={resourceQuantity} onChange={(e) => setResourceQuantity(e.target.value)} className="w-full border p-2 rounded mb-2" />
        <select value={selectedCamp} onChange={(e) => setSelectedCamp(e.target.value)} className="w-full border p-2 rounded mb-2">
          <option value="">Select Camp</option>
          {camps.map((camp) => (
            <option key={camp.id} value={camp.name}>{camp.name}</option>
          ))}
        </select>
        <button onClick={addResource} className="w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded">Add Resource</button>
      </div>

      {/* Display Camps */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-4">Relief Camps</h2>
        {camps.length === 0 ? <p className="text-gray-500 text-center">No camps added yet.</p> : (
          <ul className="divide-y divide-gray-300">
            {camps.map((camp) => (
              <li key={camp.id} className="py-2">
                <strong>{camp.name}</strong> - {camp.location} (Capacity: {camp.capacity})
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Resources */}
      <div className="bg-white shadow-md rounded-lg p-6 w-[700px]">
        <h2 className="text-xl font-semibold mb-4">Resource Distribution</h2>
        {resources.length === 0 ? <p className="text-gray-500 text-center">No resources added yet.</p> : (
          <ul className="divide-y divide-gray-300">
            {resources.map((resource) => (
              <li key={resource.id} className="py-2">
                {resource.type} - {resource.quantity} units (Assigned to {resource.camp})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ReliefManagement;
