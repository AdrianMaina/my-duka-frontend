// components/layout/MotionWrapper.jsx
import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
};

const pageTransition = {
  duration: 0.3,
  ease: "easeInOut",
};

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
