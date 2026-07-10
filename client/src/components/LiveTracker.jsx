import { useEffect, useState, useRef } from 'react';
import socket from '../socket.js';
import { iconList } from '../assets/assets.jsx';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Component to dynamically pan the map to the car's location
const MapRecenter = ({ lat, lng }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], map.getZoom(), { duration: 1.5 });
        }
    }, [lat, lng, map]);
    return null;
};

const carIcon = new L.DivIcon({
    html: '<div style="font-size: 24px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2)); text-align: center;">🚘</div>',
    className: 'custom-car-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});

const LiveTracker = ({ carId, onClose }) => {
    const [carData, setCarData] = useState({
        lat: null, 
        lng: null,
        speed: 0,
        carId: null
    });

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }

        const handleConnect = () => {
            console.log('Frontend connected to Socket server for Live Tracking');
        };

        const handleLocationUpdate = (data) => {
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
        
        // Start simulation for this car
        if (carId) {
            socket.emit('start_tracking_simulation', carId);
        }

        return () => {
            socket.off('connect', handleConnect);
            socket.off('broadcast_car_location', handleLocationUpdate);
            if (carId) {
                socket.emit('stop_tracking_simulation', carId);
            }
        };
    }, [carId]);

    const [locationName, setLocationName] = useState("Fetching location details...");
    const latestCoords = useRef({ lat: null, lng: null });
    const hasFetchedFirst = useRef(false);

    const fetchLocationName = async () => {
        const { lat, lng } = latestCoords.current;
        if (!lat || !lng) return;

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.display_name) {
                // Keep the first 3 parts of the address for a concise display
                const addressParts = data.display_name.split(', ');
                setLocationName(addressParts.slice(0, 3).join(', '));
            } else {
                setLocationName("Unknown road");
            }
        } catch (error) {
            console.error("Error fetching location name:", error);
            setLocationName("Unable to resolve address");
        }
    };

    useEffect(() => {
        latestCoords.current = { lat: carData.lat, lng: carData.lng };
        
        // Fetch immediately the first time we get valid coordinates
        if (carData.lat && carData.lng && !hasFetchedFirst.current) {
            hasFetchedFirst.current = true;
            fetchLocationName();
        }
    }, [carData.lat, carData.lng]);

    useEffect(() => {
        // Fetch every 10 seconds to avoid hitting API rate limits
        const intervalId = setInterval(fetchLocationName, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const position = carData.lat && carData.lng ? [carData.lat, carData.lng] : null;

    return (
        <div className="w-full h-full flex flex-col font-sans bg-white relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 z-10">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                    <iconList.MapPin className="text-primary animate-bounce" /> Live Car Tracking
                </h2>
                {onClose && (
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer bg-gray-50 border border-gray-200 shadow-sm">
                        <iconList.X size={24} />
                    </button>
                )}
            </div>
            
            <div className="flex-1 flex flex-col relative rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                {position ? (
                    <>

                        <MapContainer 
                            center={position} 
                            zoom={16} 
                            style={{ height: "100%", width: "100%" }}
                            zoomControl={false}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={carIcon}>
                                <Popup>
                                    <div className="text-center font-sans">
                                        <p className="font-bold mb-1">Car {carId || carData.carId}</p>
                                        <p className="text-sm text-gray-600">Speed: {carData.speed} km/h</p>
                                    </div>
                                </Popup>
                            </Marker>
                            <MapRecenter lat={carData.lat} lng={carData.lng} />
                        </MapContainer>
                        
                        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4 min-w-72 pointer-events-auto">
                            <div>
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-1">Car Details</p>
                                <p className="text-sm font-bold text-gray-800 line-clamp-1">ID: {carId || carData.carId}</p>
                            </div>
                            
                            <div className="h-px w-full bg-gray-100"></div>

                            <div className="flex flex-col gap-2">
                                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Live Location</p>
                                <div className="flex gap-2 items-start">
                                    <iconList.MapPin className="text-red-500 mt-0.5 shrink-0" size={16} />
                                    <p className="text-sm text-gray-700 font-medium leading-tight">
                                        {locationName}
                                    </p>
                                </div>
                                <div className="text-[10px] text-gray-400 font-mono mt-1 flex gap-4 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 mb-0.5">LATITUDE</span>
                                        <span className="text-gray-600 font-medium">{carData.lat.toFixed(5)}°</span>
                                    </div>
                                    <div className="w-px h-full bg-gray-200"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 mb-0.5">LONGITUDE</span>
                                        <span className="text-gray-600 font-medium">{carData.lng.toFixed(5)}°</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="h-px w-full bg-gray-100"></div>

                            <div className="flex items-center gap-3">
                                <div className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </div>
                                <div>
                                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Current Speed</p>
                                    <p className="text-xl font-bold text-gray-800 tracking-tight">{carData.speed} <span className="text-xs font-normal text-gray-500">km/h</span></p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center gap-4 text-gray-500">
                        <iconList.Loader className="animate-spin text-primary" size={40} />
                        <p className="text-xl font-medium text-gray-700">Connecting to GPS satellite...</p>
                        <p className="text-sm">Waiting for location update from car {carId && <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">{carId}</span>}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveTracker;
