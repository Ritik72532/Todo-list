import  { useEffect, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newtodo, setnewtodo] = useState("");
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        });
          // console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch data");
      }
      finally {
        setLoading(false)
      }
    }
    fetchTodos();
  }, [])

  const todoCreate = async () => {
    if (!newtodo) return;
    try {
      const response = await axios.post("http://localhost:4001/todo/create", {
        text: newtodo,
        completed: false
      },
        {
          withCredentials: true,
        })
        console.log(response.data.newTodo)
      setTodos([...todos, response.data.newTodo]);
      setnewtodo("")
      
    } catch (error) {
      setError("Failed to create todo");
    }
  }

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id)
    try {
      const response = await axios.put(`http://localhost:4001/todo/update/${id}`, {
        ...todo,
        completed: !todo.completed
      }, {
        withCredentials: true,
      })
      setTodos(todos.map((t) => t._id === id ? response.data.todo : t))
    } catch (error) {
      setError("Failed to update todo")
    }
  }

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true
      })
      setTodos(todos.filter((t) => t._id !== id))
    } catch (error) {
      setError("Failed to delete todo")
    }
  }
  const logout = async()=>{
    try {
      await axios.get("http://localhost:4001/user/logout")
      toast.success("Successfully logged out");
       <Navigate to = {"/login"} />
      localStorage.removeItem("jwt");
     
    } catch (error) {
      toast.error("Error while logout")
    }
  }
  const remainingTodos = todos.filter((todo)=> !todo.completed).length
  return (
    <div className='my-10 bg-gray-400 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6' >
      <h1 className=' mb-2.5 text-2xl font-semibold text-center' >Todo List</h1>
      <div className='flex mb-2'>
        <input
          type="text"
          placeholder="Add a new todo"
          value={newtodo}
          onChange={(e)=>setnewtodo(e.target.value)}
          onKeyPress={(e)=> e.key === "Enter" && todoCreate()}
          className="border p-2 rounded w-full"
        />
        <button onClick={todoCreate} className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-900 cursor-pointer ">Add</button>
      </div>
      {loading?(<div><span>Loading...</span></div>):error?(<div>{error}</div>):(
          <ul className='space-y-2'>
       {todos.map((todo,index)=>(
         <li key = {todo._id || index}  className='flex items-center justify-between p-1.5 rounded-md'>
          <div className='flex items-center' > 
            <input type="checkbox" checked= {todo.completed} onChange={()=> todoStatus(todo._id)} className='mr-2' />
            <span className={`${todo.completed?"line-through text-gray-300":""}`} > {todo.text}</span>

          </div>
          <button 
         onClick={()=> todoDelete(todo._id)}
          className='text-red-500 hover:text-red-900 cursor-pointer'>Delete</button>
        </li>
       ))}
      </ul>
      )};
    
      <p className='mt-4 text-center text-sm font-medium text-gray-200'>{`Remaining todos : ${remainingTodos}`}</p>
      <button 
      onClick={()=> logout()}
      className='mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-900 cursor-pointer mx-auto block'>Logout</button>
    </div>
  )
}

export default Home