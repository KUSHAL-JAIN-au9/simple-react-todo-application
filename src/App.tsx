import React, { useState } from 'react';
import { PlusCircle, CheckCircle, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-6">Todo App</h1>
      <div className="w-full max-w-md">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 p-2 border border-border rounded-l"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-primary text-white p-2 rounded-r"
            onClick={addTodo}
          >
            <PlusCircle />
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center justify-between p-2 bg-surface rounded">
              <span className={`flex-1 ${todo.completed ? 'line-through text-textSecondary' : ''}`}>
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button onClick={() => toggleComplete(todo.id)}>
                  <CheckCircle className={todo.completed ? 'text-success' : 'text-textSecondary'} />
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="text-error" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
