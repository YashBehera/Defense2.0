// motionVariants.js

// Smooth easing functions
export const easings = {
    smooth: [0.4, 0, 0.2, 1],
    smoothOut: [0, 0, 0.2, 1],
    smoothIn: [0.4, 0, 1, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
  };
  
  // Base transition configs
  export const transitions = {
    default: {
      duration: 0.4,
      ease: easings.smooth,
    },
    fast: {
      duration: 0.2,
      ease: easings.smooth,
    },
    slow: {
      duration: 0.6,
      ease: easings.smooth,
    },
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
    springBounce: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  };
  
  // Optimized variants for different animations
  export const fadeInUpVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: transitions.default,
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: transitions.fast,
    },
  };
  
  export const fadeInVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: transitions.default,
    },
    exit: { 
      opacity: 0,
      transition: transitions.fast,
    },
  };
  
  export const scaleVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: transitions.default,
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      transition: transitions.fast,
    },
  };
  
  export const slideInVariants = {
    left: {
      initial: { x: -50, opacity: 0 },
      animate: { 
        x: 0, 
        opacity: 1,
        transition: transitions.default,
      },
      exit: { 
        x: 50, 
        opacity: 0,
        transition: transitions.fast,
      },
    },
    right: {
      initial: { x: 50, opacity: 0 },
      animate: { 
        x: 0, 
        opacity: 1,
        transition: transitions.default,
      },
      exit: { 
        x: -50, 
        opacity: 0,
        transition: transitions.fast,
      },
    },
  };
  
  export const hoverVariants = {
    default: {
      scale: 1.05,
      y: -4,
      transition: transitions.spring,
    },
    scale: {
      scale: 1.05,
      transition: transitions.spring,
    },
    lift: {
      y: -8,
      scale: 1.02,
      transition: transitions.spring,
    },
  };
  
  export const tapVariants = {
    scale: 0.98,
    transition: transitions.fast,
  };
  
  // Viewport options for better performance
  export const viewportOptions = {
    once: true,
    margin: '-50px',
    amount: 0.3,
  };