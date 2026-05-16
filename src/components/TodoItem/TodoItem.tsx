import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import styles from './TodoItem.module.css';
import { Todo } from '@/types';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Med',
  high: 'High',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSubmit() {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    } else {
      setEditText(todo.text);
    }
    setEditing(false);
  }

  function handleEditKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setEditing(false);
    }
  }

  return (
    <li
      className={clsx(styles.item, {
        [styles.completed]: todo.completed,
        [styles.editing]: editing,
      })}
    >
      <div className={styles.priorityBar} data-priority={todo.priority} />

      <button
        className={clsx(styles.checkbox, { [styles.checked]: todo.completed })}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      <div className={styles.content}>
        {editing ? (
          <input
            className={styles.editInput}
            value={editText}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
            maxLength={200}
          />
        ) : (
          <span className={clsx(styles.text, { [styles.strikethrough]: todo.completed })}>
            {todo.text}
          </span>
        )}
        <span className={styles.priority} data-priority={todo.priority}>
          {PRIORITY_LABELS[todo.priority]}
        </span>
      </div>

      <div className={styles.actions}>
        {editing ? (
          <>
            <button
              className={clsx(styles.actionBtn, styles.saveBtn)}
              onClick={handleEditSubmit}
              aria-label="Save"
            >
              <Check size={15} />
            </button>
            <button
              className={clsx(styles.actionBtn, styles.cancelBtn)}
              onClick={() => { setEditText(todo.text); setEditing(false); }}
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            {!todo.completed && (
              <button
                className={clsx(styles.actionBtn, styles.editBtn)}
                onClick={() => setEditing(true)}
                aria-label="Edit"
              >
                <Pencil size={15} />
              </button>
            )}
            <button
              className={clsx(styles.actionBtn, styles.deleteBtn)}
              onClick={() => onDelete(todo.id)}
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
