'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button'; // Import Button from Shadcn UI
import { Input } from '@/app/components/input';   // Import Input from Shadcn UI

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: nextId,
      text: input,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInput('');
    setNextId(nextId + 1); // Increment the ID for the next todo
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-10">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Todo List</h1>

        {/* Input Section */}
        <div className="mb-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full p-3 border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <Button
          onClick={addTodo}
          variant="default"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white py-2 rounded-xl shadow-md transition-all duration-200"
        >
          Add Todo
        </Button>

        {/* Todo List */}
        <ul className="mt-6 space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                todo.completed ? 'bg-green-200' : 'bg-gray-100'
              } hover:bg-gray-200`}
            >
              <span
                className={`flex-1 text-lg ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-3">
                <Button
                  onClick={() => toggleTodo(todo.id)}
                  variant="default"
                  className={`px-4 py-2 rounded-full text-white transition-all duration-200 ${
                    todo.completed ? 'bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'
                  }`}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </Button>
                <Button
                  onClick={() => removeTodo(todo.id)}
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all duration-200"
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;