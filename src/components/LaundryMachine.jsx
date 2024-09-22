import React, { useState, useEffect, useCallback } from 'react';

const LaundryMachine = ({ id, onStatusChange }) => {
  const [status, setStatus] = useState('available');
  const [timeLeft, setTimeLeft] = useState(0);
  const [coins, setCoins] = useState(0);
  const [signalSent, setSignalSent] = useState(false);

  const insertCoin = () => setCoins(prevCoins => prevCoins + 1);

  const startMachine = () => {
    if (coins >= 4) {
      setStatus('in-use');
      setTimeLeft(70); 
      setCoins(0);
      setSignalSent(false);
    }
  };

  const sendSignalToLineGroup = useCallback(() => {
    console.log(`Sending signal to Line group for machine ${id} - Time left: ${formatTimeLeft(timeLeft)}`);
  }, [id, timeLeft]);

  const formatTimeLeft = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    let timer;
    if ((status === 'in-use' || status === 'finishing') && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime === 1) {
            setStatus('available');
            setSignalSent(false);
            return 0; // Stop when it reaches 0
          }
          if (prevTime <= 60 && status === 'in-use' && !signalSent) {
            setStatus('finishing');
            sendSignalToLineGroup();
            setSignalSent(true);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [status, timeLeft, signalSent, sendSignalToLineGroup]);

  useEffect(() => {
    onStatusChange(id, status);
  }, [status, id, onStatusChange]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2">
      <h2 className="text-xl font-bold mb-2">Machine {id}</h2>
      <p className="mb-2">Status: {status}</p>
      {status === 'available' && (
        <div>
          <p className="mb-2">Coins inserted: {coins}</p>
          <button 
            onClick={insertCoin}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Insert Coin
          </button>
          <button 
            onClick={startMachine} 
            disabled={coins < 4}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-2"
          >
            Start (4 coins)
          </button>
        </div>
      )}
      {(status === 'in-use' || status === 'finishing') && (
        <p>Time left: {formatTimeLeft(timeLeft)}</p>
      )}
    </div>
  );
};

export default LaundryMachine;









