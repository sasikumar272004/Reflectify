import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiDollarSign, FiLogOut, FiSettings, FiPlus 
} from "react-icons/fi";
import { RiMentalHealthLine } from "react-icons/ri";
import { TbMoodHappy } from "react-icons/tb";
import { BiChevronRight } from "react-icons/bi";

const Sidebar = ({ 
  activeSection, 
  setActiveSection, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen,
  handleLogout
}) => {
  return (
    <AnimatePresence>
      {(isMobileMenuOpen || window.innerWidth >= 768) && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="w-64 fixed inset-y-0 left-0 h-screen z-50 md:z-0 bg-white shadow-lg md:shadow-none border-r border-stone-200"
          style={{ boxSizing: 'border-box' }}
        >
          <div className="p-6 flex flex-col h-full">
            {/* Logo/Brand section */}
            <div className="flex items-center mb-8">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center mr-3 shadow-md"
              >
                <FiHome className="text-white" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-medium"
              >
                Reflectify
              </motion.h1>
            </div>

            {/* Main navigation */}
            <div className="flex-1 overflow-y-auto">
              <nav className="space-y-1">
                {[
                  { name: "Dashboard", icon: <FiHome />, section: "dashboard" },
                  { name: "Expenses", icon: <FiDollarSign />, section: "expenses" },
                  { name: "Emotions", icon: <RiMentalHealthLine />, section: "emotions" },
                  { name: "Settings", icon: <FiSettings />, section: "settings" }
                ].map((item) => (
                  <motion.button
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => {
                      setActiveSection(item.section);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                      activeSection === item.section 
                        ? 'bg-stone-100 text-stone-900' 
                        : 'text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Quick Actions section */}
              <div className="mt-8">
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3 px-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveSection("expenses");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 text-amber-800"
                  >
                    <span className="flex items-center">
                      <FiPlus className="mr-2" />
                      Add Expense
                    </span>
                    <BiChevronRight />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveSection("emotions");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-lime-50 to-lime-100 rounded-lg border border-lime-200 text-lime-800"
                  >
                    <span className="flex items-center">
                      <TbMoodHappy className="mr-2" />
                      Log Mood
                    </span>
                    <BiChevronRight />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Footer/Logout section */}
            <div className="pt-4 border-t border-stone-200">
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 rounded-lg text-stone-600 hover:bg-stone-50 transition"
              >
                <FiLogOut className="mr-3" />
                <span>Log Out</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;