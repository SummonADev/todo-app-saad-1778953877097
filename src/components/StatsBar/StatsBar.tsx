import styles from './StatsBar.module.css';

type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
};

export default function StatsBar({ total, active, completed }: StatsBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.value}>{total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={`${styles.value} ${styles.active}`}>{active}</span>
        <span className={styles.label}>Active</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.stat}>
        <span className={`${styles.value} ${styles.completed}`}>{completed}</span>
        <span className={styles.label}>Completed</span>
      </div>
    </div>
  );
}
