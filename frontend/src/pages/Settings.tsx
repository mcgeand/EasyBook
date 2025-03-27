const Settings = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Manage your account settings
        </p>
      </div>
      <div className="border-t border-gray-200">
        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <div className="text-sm font-medium text-gray-500">Profile Information</div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Your name"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings 