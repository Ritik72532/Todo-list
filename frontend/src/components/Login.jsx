import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo = useNavigate()
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4001/user/login",
        {
        
          email,
          password
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      console.log(data);

      toast.success(data.message || "User logged in successfully")
       navigateTo("/")
     localStorage.setItem("jwt",data.token)
      setEmail("")
      setPassword("")
     
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors || "User logging fail")
    }

  }
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-5 text-center' >Login</h2>
        <form onSubmit={handleRegister}>

          <div className='mb-4'>
            <label className='block mb-2 font-semibold' htmlFor="">Email</label>
            <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder='Enter email' />
          </div>
          <div className='mb-4'>
            <label className='block mb-2 font-semibold' htmlFor="">Password</label>
            <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password' />
          </div>
          <button type='submit'
            className=' w-full bg-blue-600 text-white hover:bg-blue-900 cursor-pointer rounded-xl font-semibold px-6 py-3'>Login</button>
          <p>New User?  <Link to="/signup" className='text-blue-600 hover:underline'>Signup</Link> </p>
        </form>
      </div>
    </div>

  )
}

export default Login