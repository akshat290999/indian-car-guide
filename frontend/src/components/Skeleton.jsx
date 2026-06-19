import { motion } from 'framer-motion'

export default function Skeleton({ width = '100%', height = '20px', borderRadius = '8px', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
        ease: "easeInOut"
      }}
      style={{
        width,
        height,
        borderRadius,
        background: 'var(--border)', // This changes based on theme
        ...style
      }}
    />
  )
}
