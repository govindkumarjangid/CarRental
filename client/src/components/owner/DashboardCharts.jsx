import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import {motion} from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

export const FleetChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 border border-gray-200   rounded-xl shadow-sm max-w-xl"
  >
    <h3 className="text-sm font-semibold mb-4  opacity-70 uppercase tracking-widest">Live Availability Breakdown</h3>
    <div className="h-48 flex justify-center">
      <Doughnut
        data={{
          labels: ['Available', 'Cleaning', 'Maintenance', 'Unavailable'],
          datasets: [{
            data: [data.availableCars, data.cleaningCars, data.maintenanceCars, data.unavailableCars],
            backgroundColor: [
              'rgba(34, 197, 94, 0.2)', // Green
              'rgba(59, 130, 246, 0.2)', // Blue
              'rgba(239, 68, 68, 0.2)',  // Red
              'rgba(107, 114, 128, 0.2)', // Gray
            ],
            borderColor: [
              'rgb(34, 197, 94)',
              'rgb(59, 130, 246)',
              'rgb(239, 68, 68)',
              'rgb(107, 114, 128)',
            ],
            borderWidth: 1,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { color: '#888', usePointStyle: true, boxWidth: 8, font: { size: 10 } } } }
        }}
      />
    </div>
  </motion.div>
);

export const BookingChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 border border-gray-200   rounded-xl shadow-sm"
  >
    <h3 className="text-sm font-semibold mb-4  opacity-70 uppercase tracking-widest">Booking Status Breakdown</h3>
    <div className="h-64">
      <Bar
        data={{
          labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
          datasets: [{
            label: 'Bookings',
            data: [
              data.bookingStatusCounts?.pending || 0,
              data.bookingStatusCounts?.confirmed || 0,
              data.bookingStatusCounts?.completed || 0,
              data.bookingStatusCounts?.cancelled || 0
            ],
            backgroundColor: [
              'rgba(234, 179, 8, 0.2)',  // Yellow (Pending)
              'rgba(34, 197, 94, 0.2)',  // Green (Confirmed)
              'rgba(59, 130, 246, 0.2)', // Blue (Completed)
              'rgba(239, 68, 68, 0.2)',  // Red (Cancelled)
            ],
            borderColor: [
              'rgb(234, 179, 8)',
              'rgb(34, 197, 94)',
              'rgb(59, 130, 246)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 1,
            borderRadius: 5,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#888' } }, x: { ticks: { color: '#888' } } }
        }}
      />
    </div>
  </motion.div>
);

export const PaymentChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 border border-gray-200   rounded-xl shadow-sm"
  >
    <h3 className="text-sm font-semibold mb-4  opacity-70 uppercase tracking-widest">Payment Integrity Analysis</h3>
    <div className="h-64">
      <Bar
        data={{
          labels: ['Pending', 'Confirmed', 'Failed'],
          datasets: [{
            label: 'Payments',
            data: [
              data.paymentStatusCounts?.pending || 0,
              data.paymentStatusCounts?.confirmed || 0,
              data.paymentStatusCounts?.failed || 0
            ],
            backgroundColor: [
              'rgba(245, 158, 11, 0.2)', // Orange
              'rgba(16, 185, 129, 0.2)', // Emerald
              'rgba(239, 68, 68, 0.2)',  // Red
            ],
            borderColor: [
              'rgb(245, 158, 11)',
              'rgb(16, 185, 129)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 1,
            borderRadius: 5,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1, color: '#888' } }, x: { ticks: { color: '#888' } } }
        }}
      />
    </div>
  </motion.div>
);

export const RevenueHistoryChart = ({ history, currency }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 border border-gray-200   rounded-xl shadow-sm lg:col-span-2"
  >
    <h3 className="text-sm font-semibold mb-4  opacity-70 uppercase tracking-widest">Revenue Performance History</h3>
    <div className="h-72">
      <Line
        data={{
          labels: history?.map(h => h.label) || [],
          datasets: [{
            label: 'Revenue',
            data: history?.map(h => h.revenue) || [],
            borderColor: 'rgb(147, 51, 234)', // Purple
            backgroundColor: 'rgba(147, 51, 234, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(147, 51, 234)',
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
          }]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${currency} ${context.parsed.y.toLocaleString("en-IN")}`
              }
            }
          },
          scales: {
            y: { beginAtZero: true, ticks: { color: '#888' }, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { ticks: { color: '#888' }, grid: { display: false } }
          }
        }}
      />
    </div>
  </motion.div>
);
