import React, { useState, useEffect } from "react";
import Db from "./Firebase/firebase";
// import { collection, getDocs } from "firebase/firestore/lite";
import { ref, set, push, get, remove } from "firebase/database";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [toggle, setToggle] = useState(false);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const todos = ref(Db, "Todo");
      await get(todos).then((snapshot) => {
        if (snapshot.exists()) {
          setTasks(
            Object.keys(snapshot.val()).map((task) => {
              return { ...snapshot.val()[task], id: task };
            })
          );
        } else {
          setTasks([]);
          console.log("No data found");
        }
      });
    };
    fetchData();
  }, [toggle]);

  const createTodo = async () => {
    //For Firestore Database
    // const todosCollection = collection(Db, "Todo");
    // console.log("Todo Collection", todosCollection);
    // const todosSnapshot = await getDocs(todosCollection);
    // console.log("Todo Snapshot", todosSnapshot);

    // For Realtime Database =>set update data at specific location
    const todos = ref(Db, "Todo");
    const payload = {
      title,
      published: false,
    };
    await set(push(todos), payload);
    setToggle(!toggle);

    // Read Realtime database
    // const todos = ref(Db, "Todo");
    // await get(todos).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setTasks(
    //       Object.keys(snapshot.val()).map((task) => {
    //         return { ...snapshot.val()[task], id: task };
    //       })
    //     );
    //   } else {
    //     console.log("No data found");
    //   }
    // });
  };
  console.log("Tasks", tasks);

  const taskDelete = async (id) => {
    const todos = ref(Db, "Todo/" + id);
    await remove(todos);
    setToggle(!toggle);
  };
  const publishHandler = async (id) => {
    const editTask = tasks.find((task) => task.id === id);
    const payload = {
      title: editTask.title,
      published: !editTask.published,
    };
    const todos = ref(Db, "Todo/" + id);
    await set(todos, payload);
    setToggle(!toggle);
  };
  return (
    <div className="App">
      <input type="text" value={title} onChange={(e) => titleHandler(e)} />
      <button onClick={createTodo}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div style={{ display: "flex" }}>
              <p>{task.title}</p>
              <p>Published:</p>
              <button onClick={() => publishHandler(task.id)}>
                {task.published ? "Yes" : "No"}
              </button>
              <button onClick={() => taskDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
