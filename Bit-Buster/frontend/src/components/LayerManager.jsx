import React, { useState } from 'react';

function LayerManager({ layers, onLayerToggle, onLayerVisibility }) {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-4 right-4 bg-gray-800 text-white rounded-md shadow-md">
      <div
        className="flex items-center justify-between p-3 cursor-pointer"
        onClick={handleToggle}
      >
        <span className="font-semibold">Layer Manager</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center">
              <input
                type="checkbox"
                id="panIndiaDisasters"
                className="mr-2"
                onChange={() => onLayerVisibility('panIndiaDisasters')}
                defaultChecked={true} // Set default visibility
              />
              <label htmlFor="panIndiaDisasters">
                <span className="mr-1">::</span>
                PAN India Disasters
              </label>
            </span>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {layers.map((layer) => (
              <div key={layer.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={layer.id}
                  className="mr-2"
                  onChange={() => onLayerToggle(layer.id)}
                  defaultChecked={layer.visible} // Set initial checkbox state
                />
                <label htmlFor={layer.id}>
                  {layer.icon} {layer.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 mr-2" />
              Watch
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-600 mr-2" />
              Alert
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-600 mr-2" />
              Warning
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LayerManager;