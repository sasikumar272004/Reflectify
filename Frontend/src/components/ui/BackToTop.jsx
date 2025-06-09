import { motion } from "framer-motion";

const BackToTop = () => {
  return (
    <motion.button
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-2xl flex items-center justify-center z-40`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -10, 0],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration: 2,
        repeat: Infinity
      }}
    >
      ↑
    </motion.button>
  );
};

export default BackToTop;