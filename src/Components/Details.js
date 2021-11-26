import { motion } from "framer-motion";

export const Details = ({ state }) => {
  return (
    <motion.div animate={state ? { opacity: 1 } : { opacity: 0 }} style={{ position: "absolute", top: 0, right: 0, opacity: 0 }}>
      <input type="number" />
    </motion.div>
  );
};
