import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { OwnerContext } from '../../context/OwnerContext';

const OwnerDashboard = () => {
  const { stats, loading, error, getOwnerDashboard } = useContext(OwnerContext);
  const { currency } = useContext(AppContext);
  const [localStats, setLocalStats] = useState(null);

  // Format stats with currency
  useEffect(() => {
    if (stats) {
      setLocalStats({
        ...stats,
        totalEarnings: NaN||`${(stats.totalEarnings || 0).toLocaleString()}`
      });
    }
  }, [stats, currency]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-center">
      <p className="text-red-500 mb-4">Error: {error}</p>
      <button
        onClick={getOwnerDashboard}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retry Loading Dashboard
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Owner Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Vehicles" value={localStats?.totalVehicles || 0} icon="🚗" />
        <StatCard title="Total Bookings" value={localStats?.totalBookings || 0} icon="📅" />
        <StatCard title="Active Bookings" value={localStats?.activeBookings || 0} icon="✅" />
        <StatCard title="Cancelled Bookings" value={localStats?.cancelledBookings || 0} icon="❌" />
        <StatCard title="Total Earnings" value={localStats?.totalEarnings || `${currency}0`} icon="💰" />
      </div>

      {/* Recent Bookings */}
      <RecentBookings bookings={localStats?.recentBookings} currency={currency} />
    </div>
  );
};

const RecentBookings = ({ bookings, currency }) => {
  if (!bookings?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No bookings found for your vehicles
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">Recent Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map(booking => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={booking.vehicleData?.image || '/vehicle-placeholder.png'} 
                      alt={booking.vehicleData?.name || 'Vehicle'} 
                    />
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {booking.vehicleData?.name || 'Unknown Vehicle'}
                      </div>
                      <div className="text-gray-500">
                        {booking.vehicleData?.category || ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{booking.userData?.name}</div>
                  <div className="text-gray-500">{booking.userData?.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">
                    {booking.pickupDate} to {booking.dropoffDate}
                  </div>
                  <div className="text-gray-500">{booking.totalDays} days</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {currency}{booking.amount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.isCancelled ? 'bg-red-100 text-red-800' :
                    booking.isCompleted ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {booking.isCancelled ? 'Cancelled' :
                     booking.isCompleted ? 'Completed' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

export default OwnerDashboard;