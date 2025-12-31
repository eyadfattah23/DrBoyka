import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1];

const defaultProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.4 },
};

export const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2.2, ease } },
  },
  scaleFade: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } },
  },
  scaleZ: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease } },
  },
  // slideX ثابت بال defaults
  slideXLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease } },
  },
  slideXRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease } },
  },
  // slideY ثابت بال defaults
  slideYUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  },
  slideYDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  },
};

// MotionDiv جاهز
export const MotionDiv = ({
  children,
  variant,
  overrideProps = {},
  visibleOverride = {},
}) => {
  let v = variants[variant] || variants.fade;

  if (v.visible && Object.keys(visibleOverride).length > 0) {
    v = { ...v, visible: { ...v.visible, ...visibleOverride } };
  }

  return (
    <motion.div {...defaultProps} {...overrideProps} variants={v}>
      {children}
    </motion.div>
  );
};
