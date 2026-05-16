import { useState, useCallback } from 'react';
import { Todo, FilterType, Priority } from '@/types';

const STORAGE_KEY = 'todo-app-todos';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Todo[];
  } catch {
    // ignore
  }
  return [];
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');

  const updateAndSave = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev);
      saveToStorage(next);
      return next;
    });
  }, []);

  const addTodo = useCallback((text: string, priority: Priority) => {
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    updateAndSave((prev) => [todo, ...prev]);
  }, [updateAndSave]);

  const toggleTodo = useCallback((id: string) => {
    updateAndSave((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, [updateAndSave]);

  const deleteTodo = useCallback((id: string) => {
    updateAndSave((prev) => prev.filter((t) => t.id !== id));
  }, [updateAndSave]);

  const editTodo = useCallback((id: string, text: string) => {
    updateAndSave((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text } : t))
    );
  }, [updateAndSave]);

  const clearCompleted = useCallback(() => {
    updateAndSave((prev) => prev.filter((t) => !t.completed));
  }, [updateAndSave]);

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
    totalCount: todos.length,
  };
}
