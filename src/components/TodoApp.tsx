
import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <TodoInput onAddTodo={addTodo} />
        <div className="mt-4 flex justify-between items-center text-sm">
          <span>{activeCount} tasks remaining</span>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition-colors duration-200"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>

      {/* Filter */}
      <TodoFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        completedCount={completedCount}
      />

      {/* Todo List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {filter === 'completed' ? (
              <div>
                <div className="text-4xl mb-2">🎉</div>
                <p>No completed tasks yet</p>
              </div>
            ) : filter === 'active' ? (
              <div>
                <div className="text-4xl mb-2">✨</div>
                <p>No active tasks</p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">📝</div>
                <p>No tasks yet. Add one above!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
