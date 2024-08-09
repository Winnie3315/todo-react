import React, { useState } from 'react';
import './App.css';
import Item from './components/Item';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const doSubmit = (event) => {
        event.preventDefault();
        const trimmedValue = inputValue.trim();
        if (trimmedValue === '') {
            alert("fill");
            return;
        }

        const newTask = {
            id: crypto.randomUUID(),
            task: trimmedValue,
            time: new Date().toLocaleTimeString(),
            isDone: false
        };

        setTodos([...todos, newTask]);
        setInputValue('');
    };

    const toggleTaskCompletion = (id) => {
        const updatedTodos = todos.map(task => 
            task.id === id ? { ...task, isDone: !task.isDone } : task
        );
        setTodos(updatedTodos);
    };

    const deleteTask = (id) => {
        const updatedTodos = todos.filter(task => task.id !== id);
        setTodos(updatedTodos);
    };

    const changeTask = (id) => {
        const newTitle = prompt("Change the task:");
        if (newTitle) {
            const updatedTodos = todos.map(task => 
                task.id === id ? { ...task, task: newTitle } : task
            );
            setTodos(updatedTodos);
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Todo App</h1>
            </header>
            <main>
                <center>
                    <form onSubmit={doSubmit}>
                        <input 
                            className="inp" 
                            type="text" 
                            name="title" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            aria-label="Task input"
                        />
                        <button className="btn" type="submit">Add Task</button>
                    </form>
                </center>

                <section className="container">
                    {todos.map(task => (
                        <Item 
                            key={task.id} 
                            task={task} 
                            onDelete={deleteTask} 
                            onChange={changeTask} 
                            onToggle={toggleTaskCompletion} 
                        />
                    ))}
                </section>
            </main>
        </div>
    );
};

export default App;
