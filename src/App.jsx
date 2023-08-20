import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setAllTodos] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription,
        };
        let updatedTodoArray = [...allTodos];
        updatedTodoArray.push(newTodoItem);
        setAllTodos(updatedTodoArray);
        localStorage.setItem("todolist", JSON.stringify(updatedTodoArray));
        setNewTitle("");
        setNewDescription("");
    };

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        reducedTodo.splice(index, 1);
        localStorage.setItem("todolist", JSON.stringify(reducedTodo));
        setAllTodos(reducedTodo);
    };

    const handleCompleteDeleteTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo.splice(index, 1);
        localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
        setCompletedTodos(reducedTodo);
    };

    const handleComplete = (index) => {
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();
        let completedOn = dd + "-" + mm + "-" + yyyy + " at" + h + ":" + m + ":" + s;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn,
        };

        let updatedCompletedArr = [...completedTodos];
        updatedCompletedArr.push(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);
        localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
    };

    useEffect(() => {
        let savedTodo = JSON.parse(localStorage.getItem("todolist"));
        let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
        if (savedTodo) {
            setAllTodos(savedTodo);
        }
        if (savedCompletedTodo) {
            setCompletedTodos(savedCompletedTodo);
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
                        className={`secondaryBtn secTodo ${isCompleteScreen === false && "active"}`}
                        onClick={() => setIsCompleteScreen(false)}
                    >
                        Todo
                    </button>
                    <button
                        className={`secondaryBtn secComp  ${isCompleteScreen === true && "active"}`}
                        onClick={() => setIsCompleteScreen(true)}
                    >
                        Completed
                    </button>
                </div>
                <div className="todo-list">
                    {isCompleteScreen === false &&
                        allTodos.map((item, index) => {
                            return (
                                <div className="todo-listItems" key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <AiOutlineDelete
                                            className="icon"
                                            title="Delete?"
                                            onClick={() => handleDeleteTodo(index)}
                                        />
                                        <BsCheckLg
                                            className="check-icon"
                                            title="Complete?"
                                            onClick={() => handleComplete(index)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    {isCompleteScreen === true &&
                        completedTodos.map((item, index) => {
                            return (
                                <div className="todo-listItems" key={index}>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <p>
                                            <small>Completed on: {item.completedOn}</small>
                                        </p>
                                    </div>
                                    <div>
                                        <AiOutlineDelete
                                            className="icon"
                                            title="Delete?"
                                            onClick={() => handleCompleteDeleteTodo(index)}
                                        />
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
