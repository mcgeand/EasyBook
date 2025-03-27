const Bookings = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Bookings</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your appointments and reservations
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="text-sm font-medium text-gray-500">Upcoming Bookings</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 italic">No upcoming bookings</p>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="text-sm font-medium text-gray-500">Past Bookings</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="border-b border-gray-200 pb-4">
            <p className="text-gray-500 italic">No past bookings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bookings 