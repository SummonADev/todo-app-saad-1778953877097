import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm/AddTodoForm';
import FilterBar from '@/components/FilterBar/FilterBar';
import TodoList from '@/components/TodoList/TodoList';
import StatsBar from '@/components/StatsBar/StatsBar';

export default function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount,
  } = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done</p>
        </header>

        <StatsBar
          total={totalCount}
          active={activeCount}
          completed={completedCount}
        />

        <AddTodoForm onAdd={addTodo} />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
          completedCount={completedCount}
        />

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          filter={filter}
        />
      </div>
    </div>
  );
}
