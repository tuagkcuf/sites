import { useEffect, useState } from "react";
import { FiTrash2 } from 'react-icons/fi';
const api_base = "http://localhost:3001";

function App() {

    const [todos, setTodos] = useState([]);
    const [popupActive, setPopupActive] = useState(false);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        GetTodos();
    }, []);

    const GetTodos = () => {
        fetch(api_base + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch((err) => console.log(err));
    }

    const completeTodo = async id => {
        const data = await fetch(api_base + "/todo/complete/" + id)
            .then(res => res.json());

        setTodos(todos => todos.map(todo => {
            if (todo._id === data._id) {
                todo.complete = data.complete;
            }

            return todo;
        }));
    }

    const addTodo = async () => {
        if (!newTodo) return;

        const data = await fetch(api_base + "/todo/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: newTodo,
            }),
        }).then(res => res.json());

        setTodos([...todos, data]);

        setPopupActive(false);
        setNewTodo("");
    }

    const deleteTodo = async (id, event) => {
        event.stopPropagation();

        const data = await fetch(api_base + "/todo/delete/" + id, { method: "DELETE" })
            .then(res => res.json());
            
        setTodos(todos => todos.filter(todo => todo._id !== data._id));
    }

    return (
        <div className="App">

            <h1>TODO APP</h1>
            <h4>Your tasks: </h4>

            <div className="todos">
                {todos.length > 0 ? todos.map(todo => (
                <div className={"todo" + (todo.complete ? " is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
                    <div className="checkbox"></div>

                    <div className="text">{todo.text}</div>

                    <div className="delete-todo" onClick={(event) => deleteTodo(todo._id, event)}><FiTrash2 /></div>  
                </div>
                )) : (
                    <p>You currently have no tasks</p>
              )}
            </div>

            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>

                {popupActive ? (
                    <div className="popup">
                        <div className="closePopup" onClick={() => setPopupActive(false)}>X</div>
                        <div className="content">
                            <h3>Add task</h3>
                            <input type="text" className="add-todo-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                            <div className="button" onClick={addTodo}>Create Task</div>
                        </div>
                    </div>
                ) : ""}
            
      </div>
);
}

export default App;
