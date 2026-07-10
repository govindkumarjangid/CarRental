import React, { useState, useEffect } from 'react';
import socket from '../socket.js';
import { iconList } from '../assets/assets.jsx';

const LiveTracker = ({ carId, onClose }) => {
    const [carData, setCarData] = useState({
        lat: null, 
        lng: null,
        speed: 0
    });

    useEffect(() => {
        // Connect if not already connected
        if (!socket.connected) {
            socket.connect();
        }

        const handleConnect = () => {
            console.log('Frontend connected to Socket server for Live Tracking');
        };

        const handleLocationUpdate = (data) => {
            // Only update if it matches the tracked carId, or if no specific carId is tracking (fallback)
            if (!carId || data.carId === carId) {
                setCarData({
                    lat: data.latitude,
                    lng: data.longitude,
                    speed: data.speed,
                    carId: data.carId
                });
            }
        };

        socket.on('connect', handleConnect);
        socket.on('broadcast_car_location', handleLocationUpdate);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('broadcast_car_location', handleLocationUpdate);
        };
    }, [carId]);

    return (
        <div className="w-full h-full flex flex-col font-sans bg-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <iconList.MapPin className="text-primary animate-bounce" /> Live Car Tracking
                </h2>
                {onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer bg-gray-50 border border-gray-200">
                        <iconList.X size={24} />
                    </button>
                )}
            </div>
            
            {carData.lat && carData.lng ? (
                <div className="bg-gray-50 p-8 rounded-3xl flex-1 flex flex-col justify-center items-center border border-gray-100">
                    <div className="text-center mb-12">
                        <p className="text-lg text-gray-500 mb-2">Tracking Car ID</p>
                        <p className="text-3xl font-bold text-primary px-6 py-2 bg-primary/10 rounded-2xl">{carId || carData.carId}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <p className="text-gray-500 font-medium mb-2">Latitude</p>
                            <p className="text-3xl font-bold text-gray-800">{carData.lat}</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                            <p className="text-gray-500 font-medium mb-2">Longitude</p>
                            <p className="text-3xl font-bold text-gray-800">{carData.lng}</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-5">
                                <span className="relative flex h-4 w-4">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                                </span>
                            </div>
                            <p className="text-gray-500 font-medium mb-2">Speed</p>
                            <p className="text-3xl font-bold text-gray-800">{carData.speed} <span className="text-lg text-gray-500">km/h</span></p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gray-50 p-8 rounded-3xl flex-1 flex flex-col items-center justify-center gap-4 text-gray-500 border border-gray-100">
                    <iconList.Loader className="animate-spin text-primary" size={40} />
                    <p className="text-xl font-medium text-gray-700">Connecting to GPS satellite...</p>
                    <p className="text-sm">Waiting for location update from car {carId && <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{carId}</span>}</p>
                </div>
            )}
        </div>
    );
};

export default LiveTracker;
