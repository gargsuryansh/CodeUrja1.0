import React, { useState } from 'react';

function VolunteerCoordination() {
  const [volunteerDetails, setVolunteerDetails] = useState({
    name: '',
    contact: '',
    address: '',
    skills: '',
    availability: '',
    language: 'Hindi',
  });

  const [assignedTask, setAssignedTask] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);

  const handleChange = (e) => {
    setVolunteerDetails({ ...volunteerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const simulatedTask = {
      task: 'Provide first aid at relief camp',
      location: 'Relief Camp, Indore',
      deadline: '2024-12-31',
    };
    setAssignedTask(simulatedTask);
    setTaskStatus('Assigned');
  };

  const handleTaskAccept = () => setTaskStatus('Accepted');
  const handleTaskDecline = () => {
    setTaskStatus('Declined');
    setAssignedTask(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-5 rounded-lg shadow-lg max-w-sm w-full border border-gray-700">
        <h2 className="text-xl font-semibold text-cyan-400 mb-3 text-center">Volunteer Coordination</h2>

        {!assignedTask ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            {['name', 'contact', 'address', 'skills', 'availability'].map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-gray-300 capitalize">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={volunteerDetails[field]}
                  onChange={handleChange}
                  className="mt-1 w-full p-1.5 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-cyan-400 focus:border-cyan-400 text-sm"
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-300">Language</label>
              <select
                name="language"
                value={volunteerDetails.language}
                onChange={handleChange}
                className="mt-1 w-full p-1.5 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-cyan-400 focus:border-cyan-400 text-sm"
              >
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
             </select>
            </div>

            <button type="submit" className="w-full py-1.5 rounded-md text-white bg-cyan-500 hover:bg-cyan-400 text-sm">
              Submit
            </button>
          </form>
        ) : (
          <div className="bg-gray-700 p-3 rounded-md shadow-md text-sm">
            <p className="text-cyan-400 font-medium">Task Assigned</p>
            <p><strong>Task:</strong> {assignedTask.task}</p>
            <p><strong>Location:</strong> {assignedTask.location}</p>
            <p><strong>Deadline:</strong> {assignedTask.deadline}</p>

            <div className="mt-3 flex justify-between">
              {taskStatus === 'Assigned' && (
                <>
                  <button onClick={handleTaskAccept} className="px-2 py-1 bg-green-500 hover:bg-green-400 text-white rounded text-xs">
                    Accept
                  </button>
                  <button onClick={handleTaskDecline} className="px-2 py-1 bg-red-500 hover:bg-red-400 text-white rounded text-xs">
                    Decline
                  </button>
                </>
              )}
              {taskStatus === 'Accepted' && <p className="text-green-400">Task Accepted</p>}
              {taskStatus === 'Declined' && <p className="text-red-400">Task Declined</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolunteerCoordination;
