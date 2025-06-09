import { motion } from "framer-motion";

const FloatingBlob = ({ size, color, initialX, initialY, duration, delay, opacity, blur }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${blur || 'blur-xl'} ${opacity || 'opacity-20'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        x: initialX,
        y: initialY
      }}
      animate={{
        x: [initialX, initialX + (Math.random() * 200 - 100), initialX],
        y: [initialY, initialY + (Math.random() * 100 - 50), initialY],
        scale: [1, 1.2 + Math.random() * 0.3, 1],
        rotate: [0, Math.random() * 360]
      }}
      transition={{
        duration: duration || 15 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay || Math.random() * 5
      }}
    />
  );
};

export default FloatingBlob;