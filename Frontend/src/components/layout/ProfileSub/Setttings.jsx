import { motion } from "framer-motion";

const Settings = ({ userData }) => {
  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-medium mb-1">Account Settings</h1>
          <p className="text-stone-600 text-sm md:text-base">
            Manage your profile and application preferences
          </p>
        </div>
      </motion.div>

      {/* Profile Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <div className="mb-6">
          <h3 className="text-base md:text-lg font-medium mb-4">Profile Information</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-medium mb-3">
                {userData?.name.charAt(0)}
              </div>
              <button className="text-xs text-sky-600 hover:text-sky-700">
                Change Photo
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-stone-600 mb-1">First Name</label>
                <input 
                  type="text" 
                  defaultValue={userData?.name.split(' ')[0]} 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-stone-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue={userData?.name.split(' ')[1]} 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-stone-600 mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue={userData?.email} 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-stone-600 mb-1">Join Date</label>
                <input 
                  type="text" 
                  defaultValue={new Date(userData?.joinDate).toLocaleDateString()} 
                  disabled 
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-stone-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            Save Changes
          </motion.button>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <h3 className="text-base md:text-lg font-medium mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm md:text-base font-medium">Email Notifications</h4>
              <p className="text-xs md:text-sm text-stone-600">Receive updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm md:text-base font-medium">Push Notifications</h4>
              <p className="text-xs md:text-sm text-stone-600">Receive app notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm md:text-base font-medium">Weekly Reports</h4>
              <p className="text-xs md:text-sm text-stone-600">Receive weekly summaries</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* App Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-stone-200"
      >
        <h3 className="text-base md:text-lg font-medium mb-4">Application Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-stone-600 mb-1">Theme</label>
            <select className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
              <option>System Default</option>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-stone-600 mb-1">Currency</label>
            <select className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
              <option>JPY - Japanese Yen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm md:text-base font-medium text-stone-600 mb-1">Date Format</label>
            <select className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-rose-200"
      >
        <h3 className="text-base md:text-lg font-medium mb-4 text-rose-600">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-rose-50 rounded-lg">
            <div className="mb-2 md:mb-0">
              <h4 className="text-sm md:text-base font-medium">Delete Account</h4>
              <p className="text-xs md:text-sm text-stone-600">Permanently remove your account and all data</p>
            </div>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm md:text-base transition">
              Delete Account
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-amber-50 rounded-lg">
            <div className="mb-2 md:mb-0">
              <h4 className="text-sm md:text-base font-medium">Reset Preferences</h4>
              <p className="text-xs md:text-sm text-stone-600">Reset all settings to default values</p>
            </div>
            <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm md:text-base transition">
              Reset Settings
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;