import React, { useState, useCallback } from 'react';
import LaundryMachine from './LaundryMachine';

const LaundryRoom = () => {
  const [machineStatuses, setMachineStatuses] = useState({
    1: 'available',
    2: 'available',
    3: 'available',
    4: 'available',
  });

  const handleStatusChange = useCallback((id, status) => {
    setMachineStatuses(prevStatuses => {
      if (prevStatuses[id] !== status) {
        return { ...prevStatuses, [id]: status };
      }
      return prevStatuses;
    });
  }, []);

  const renderMachines = () => (
    Object.keys(machineStatuses).map(id => (
      <LaundryMachine 
        key={id} 
        id={parseInt(id)} 
        onStatusChange={handleStatusChange} 
      />
    ))
  );

  const renderStatusList = () => (
    Object.entries(machineStatuses).map(([id, status]) => (
      <li key={id} className="mb-2">Machine {id}: {status}</li>
    ))
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Smart Laundromat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderMachines()}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Machine Availability</h2>
        <ul>
          {renderStatusList()}
        </ul>
      </div>
    </div>
  );
};

export default LaundryRoom;



