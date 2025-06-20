import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({
  text = '로그인 처리 중입니다...',
}: {
  text?: string;
}) {
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div
        className={styles.spinner}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
}
