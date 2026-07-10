const { io } = require('socket.io-client');

// Connect to backend server
const socket = io('http://localhost:3000');

// Dummy route coordinates (Delhi CP to India Gate)
const routeCoordinates = [
    { lat: 28.6315, lng: 77.2167 }, 
    { lat: 28.6270, lng: 77.2167 },
    { lat: 28.6225, lng: 77.2180 },
    { lat: 28.6180, lng: 77.2210 },
    { lat: 28.6129, lng: 77.2295 }  
];

socket.on('connect', () => {
    console.log('Simulator connected to backend! ID:', socket.id);
    startSimulation();
});

function startSimulation() {
    let currentIndex = 0;
    
    // Accept carId from command line arguments, fallback to default
    const simulatedCarId = process.argv[2] || 'DL1C-AA-1234';

    // Run loop every 5 seconds
    setInterval(() => {
        const location = routeCoordinates[currentIndex];
        
        // Add random variation to coordinates
        const dynamicLat = location.lat + (Math.random() - 0.5) * 0.0005;
        const dynamicLng = location.lng + (Math.random() - 0.5) * 0.0005;

        const payload = {
            carId: simulatedCarId,
            latitude: dynamicLat.toFixed(6),
            longitude: dynamicLng.toFixed(6),
            speed: Math.floor(Math.random() * (60 - 40 + 1)) + 40,
            timestamp: new Date().toISOString()
        };

        // Emit to backend
        socket.emit('car_location_update', payload);
        console.log('Emitted live location:', payload);

        // Increment index, loop back to start
        currentIndex = (currentIndex + 1) % routeCoordinates.length;

    }, 5000); 
}

socket.on('disconnect', () => {
    console.log('Disconnected from backend server');
});
