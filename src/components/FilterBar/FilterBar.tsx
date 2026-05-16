import styles from './FilterBar.module.css';
import { FilterType } from '@/types';
import { Trash2 } from 'lucide-react';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button className={styles.clearBtn} onClick={onClearCompleted}>
          <Trash2 size={14} />
          <span>Clear {completedCount} completed</span>
        </button>
      )}
    </div>
  );
}
