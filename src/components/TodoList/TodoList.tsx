import styles from './TodoList.module.css';
import { Todo, FilterType } from '@/types';
import TodoItem from '@/components/TodoItem/TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  filter: FilterType;
};

export default function TodoList({ todos, onToggle, onDelete, onEdit, filter }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📋</div>
        <p className={styles.emptyTitle}>
          {filter === 'completed'
            ? 'No completed todos yet'
            : filter === 'active'
            ? 'No active todos — well done!'
            : 'Add your first todo above'}
        </p>
        <p className={styles.emptyHint}>Your tasks will appear here</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
