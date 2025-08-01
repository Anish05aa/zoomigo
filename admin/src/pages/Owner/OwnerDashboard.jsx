import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { OwnerContext } from '../../context/OwnerContext';

const OwnerDashboard = () => {
  const { stats, loading, error, getOwnerDashboard } = useContext(OwnerContext);
  const { currency } = useContext(AppContext);
  const [localStats, setLocalStats] = useState(null);

  useEffect(() => {
    if (stats) {
      setLocalStats({
        ...stats,
        totalEarnings: NaN || `${(stats.totalEarnings || 0).toLocaleString()}`
      });
    }
  }, [stats, currency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#E53935] border-opacity-75"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-[#E53935] mb-4 font-semibold">Oops! {error}</p>
        <button
          onClick={getOwnerDashboard}
          className="px-4 py-2 bg-[#E53935] text-white rounded hover:bg-[#d6302f] transition"
        >
          Retry Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-black mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Vehicles" value={localStats?.totalVehicles || 0} icon="🚗" />
        <StatCard title="Total Bookings" value={localStats?.totalBookings || 0} icon="📅" />
        <StatCard title="Active Bookings" value={localStats?.activeBookings || 0} icon="✅" />
        <StatCard title="Cancelled Bookings" value={localStats?.cancelledBookings || 0} icon="❌" />
        <StatCard title="Total Earnings" value={`${currency}${localStats?.totalEarnings || '0'}`}
          icon="💰" />
      </div>

      <RecentBookings bookings={localStats?.recentBookings} currency={currency} />
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-xl shadow border border-gray-200 hover:shadow-md transition duration-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <p className="mt-1 text-2xl font-bold text-black">{value}</p>
      </div>
      <span className="text-3xl">{icon}</span>
    </div>
  </div>
);

const RecentBookings = ({ bookings, currency }) => {
  if (!bookings?.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-600">
        No recent bookings available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-[#E53935] text-white">Recent Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Vehicle", "Customer", "Dates", "Amount", "Status"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
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
                      <p className="font-medium text-black">{booking.vehicleData?.name || 'Unknown'}</p>
                      <p className="text-gray-500 text-sm">{booking.vehicleData?.category || ''}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-black">{booking.userData?.name}</p>
                  <p className="text-gray-500 text-sm">{booking.userData?.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-black">{booking.pickupDate} - {booking.dropoffDate}</p>
                  <p className="text-gray-500 text-sm">{booking.totalDays} days</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {currency}{booking.amount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${booking.isCancelled ? 'bg-red-100 text-red-700' :
                      booking.isCompleted ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
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

export default OwnerDashboard;
