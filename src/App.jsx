import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setAllTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [CompletedTodos, setCompletedTodos] = useState([]);


    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            desrciption: newDescription,
        };
        let updatedTodoArray = [...allTodos];
        updatedTodoArray.push(newTodoItem);
        setAllTodos(updatedTodoArray);
        localStorage.setItem("todolist", JSON.stringify(updatedTodoArray));
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index,1);
        localStorage.setItem("todolist", JSON.stringify(reducedTodo));
        setAllTodos(reducedTodo);
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todolist"));
        if (savedTodo) {
            setAllTodos(savedTodo);
        }
    }, []);

    return (
        <div className="App">
            <h1>My Todos</h1>
            <div className="todo-wrapper">
                <div className="todo-input">
                    <div className="todo-inputItem">
                        <label>Title</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Whats the task you want to do?"
                        />
                    </div>
                    <div className="todo-inputItem">
                        <label>Description</label>
                        <input
                            type="text"
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Whats the task Description?"
                        />
                    </div>
                    <div className="todo-inputItem">
                        <button type="button" onClick={handleAddTodo} className="primaryBtn">
                            Add
                        </button>
                    </div>
                </div>
                <div className="btn-area">
                    <button
                        className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>
                <div className="todo-list">
                    {allTodos.map((item, index) => {
                        return (
                            <div className="todo-listItems" key={index}>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desrciption}</p>
                                </div>
                                <div>
                                    <AiOutlineDelete className="icon" title="Delete?" onClick={() => handleDeleteTodo(index)} />
                                    <BsCheckLg className="check-icon"  />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
