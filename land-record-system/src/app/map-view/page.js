'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LandDetails from '../../components/land/LandDetails';

// Dynamically import MapView component with no SSR since Leaflet requires browser environment
const MapView = dynamic(() => import('../../components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function MapViewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [lands, setLands] = useState([]);
  const [selectedLandId, setSelectedLandId] = useState(null);
  const [selectedLand, setSelectedLand] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapMode, setMapMode] = useState('view'); // 'view' or 'edit'

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      // Fetch lands
      const fetchLands = async () => {
        try {
          setIsLoading(true);
          
          const response = await fetch('/api/land');
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch lands');
          }
          
          setLands(data.lands || []);
        } catch (err) {
          console.error('Error fetching lands:', err);
          setError('Failed to fetch land records. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchLands();
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch selected land details
    if (selectedLandId) {
      const fetchLandDetails = async () => {
        try {
          const response = await fetch(`/api/land?id=${selectedLandId}`);
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch land details');
          }
          
          setSelectedLand(data.land);
        } catch (err) {
          console.error('Error fetching land details:', err);
          setError('Failed to fetch land details. Please try again.');
          setSelectedLand(null);
        }
      };
      
      fetchLandDetails();
    } else {
      setSelectedLand(null);
    }
  }, [selectedLandId]);

  const handleLandSelect = (landId) => {
    setSelectedLandId(landId);
  };

  const handleToggleMapMode = () => {
    setMapMode(prevMode => prevMode === 'view' ? 'edit' : 'view');
  };

  const handleSaveBoundaries = async (boundaries) => {
    if (!selectedLandId) return;
    
    try {
      const response = await fetch(`/api/land/update-boundaries`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          landId: selectedLandId,
          boundaries
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update boundaries');
      }
      
      // Update the selected land with new boundaries
      setSelectedLand(prev => ({
        ...prev,
        boundaries
      }));
      
      // Switch back to view mode
      setMapMode('view');
      
      // Refresh the lands data
      const landsResponse = await fetch('/api/land');
      const landsData = await landsResponse.json();
      
      if (landsResponse.ok) {
        setLands(landsData.lands || []);
      }
      
    } catch (err) {
      console.error('Error updating boundaries:', err);
      setError('Failed to update land boundaries. Please try again.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Land Parcel Map View</h1>
          
          {selectedLandId && session?.user?.role === 'user' && (
            <Button
              onClick={handleToggleMapMode}
              variant={mapMode === 'edit' ? 'success' : 'primary'}
            >
              {mapMode === 'edit' ? 'Save Boundaries' : 'Edit Boundaries'}
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Visualize and manage your land parcels geographically.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Side Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Land Selection */}
          <Card>
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4">Your Land Records</h2>
              
              {lands.length > 0 ? (
                <div className="space-y-2">
                  {lands.map(land => (
                    <div
                      key={land._id}
                      className={`p-3 rounded-md cursor-pointer ${
                        selectedLandId === land._id
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => handleLandSelect(land._id)}
                    >
                      <h3 className="font-medium">{land.surveyNumber}</h3>
                      <p className="text-sm text-gray-600">{land.location.address}, {land.location.district}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{land.area} {land.areaUnit}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          land.status === 'active' ? 'bg-green-100 text-green-800' :
                          land.status === 'under_dispute' ? 'bg-red-100 text-red-800' :
                          land.status === 'mutation_in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {land.status.replace('_', ' ').charAt(0).toUpperCase() + land.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 mb-4">You don't have any registered land yet.</p>
                  <Button
                    onClick={() => router.push('/land-registration')}
                    size="sm"
                  >
                    Register Land
                  </Button>
                </div>
              )}
            </div>
          </Card>
          
          {/* Selected Land Details */}
          {selectedLand && (
            <div className="hidden lg:block">
              <LandDetails land={selectedLand} />
            </div>
          )}
        </div>
        
        {/* Map Container */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden h-[60vh]">
            <MapView
              lands={lands}
              selectedLandId={selectedLandId}
              onLandSelect={handleLandSelect}
              editable={mapMode === 'edit'}
              onSaveBoundaries={handleSaveBoundaries}
            />
          </Card>
          
          {/* Mobile view of selected land details */}
          {selectedLand && (
            <div className="mt-6 lg:hidden">
              <LandDetails land={selectedLand} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
