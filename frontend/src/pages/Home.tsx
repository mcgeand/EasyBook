const Home = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to EasyBook</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Your simple booking solution
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">
            EasyBook helps you manage appointments and reservations with ease. Get started by creating a booking or checking your existing reservations.
          </p>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div className="p-6 bg-indigo-50 rounded-lg">
              <h2 className="text-lg font-medium text-indigo-700">Make a Booking</h2>
              <p className="mt-2 text-sm text-indigo-600">
                Schedule appointments, reserve resources, or book services in just a few clicks.
              </p>
            </div>
            <div className="p-6 bg-green-50 rounded-lg">
              <h2 className="text-lg font-medium text-green-700">Manage Your Schedule</h2>
              <p className="mt-2 text-sm text-green-600">
                View, modify, or cancel your bookings anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 