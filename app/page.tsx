"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  return (
    <div>
      <h1>Mis tareas</h1>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && newTask.trim() !== "") {
            setTodos([
              ...todos,
              { id: Date.now(), text: newTask, completed: false },
            ]);
            setNewTask("");
          }
        }}
        placeholder="Agrega una nueva tarea y presiona Enter"
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <button
              onClick={() =>
                setTodos(
                  todos.map((t) =>
                    t.id === todo.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
            >
              {todo.completed ? "✅" : "⬜"}
            </button>

            {editingId === todo.id ? (
              <input
                autoFocus
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, text: editingText } : t
                    )
                  );
                  setEditingId(null);
                }}
              />
            ) : (
              <span
                onClick={() => {
                  setEditingId(todo.id);
                  setEditingText(todo.text);
                }}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            )}

            <button
              onClick={() =>
                setTodos(todos.filter((t) => t.id !== todo.id))
              }
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}