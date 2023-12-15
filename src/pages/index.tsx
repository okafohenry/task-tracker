import { setToken, setUser } from '../redux/reducers/userReducer';
import UserService from '../services/users.services';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const initialState = {
  email:'',
  password: ''
}

export default function Signin() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const userService = new UserService();
  const router = useRouter();
  const dispatch = useDispatch();
  const inputStyle = "w-full text-black font-normal px-[12px] py-[10px] rounded-[6px] border border-gray-50 outline-black";

  const handleSignIn = () => {
    if(formData.email === '' || formData.password === ''){
      toast.error('Ensure no field is empty!');
      return;
    };

    setLoading(true);
    try {
      userService.SignIn(formData)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if(res?.error){
          toast.error(res?.error);
        }else{
          toast.success('Login successful!');
          dispatch(setUser(res.user));
          dispatch(setToken(res.token));
          localStorage.setItem('tracka-token', res?.token);
          router.push('/tasks')
        }
      })
    }catch(err: any){
      setLoading(false);
      toast.error(err?.message)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     

      <div className="relative flex place-items-center before:absolute before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] lg:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
        <h1 className='text-3xl font-bold mb-4'>Login</h1>
      </div>

      <div className="absolute top-[10rem] grid gap-y-6 lg:w-[30%] w-[80%] lg:px-[2rem] pt-[2rem] pb-[4rem] rounded-md px-3 mx-auto bg-zinc-800 shadow-md">
        <div>
          <label>Email</label><br />
          <input
            className={`${inputStyle}`} 
            onChange={(e: any) => setFormData({...formData, email: e.target.value})}
            value={formData.email}
            required
            type="email" />
        </div>
        <div>
          <label>Password</label><br />
          <input
            className={`${inputStyle}`}
            onChange={(e: any) => setFormData({...formData, password: e.target.value})}
            value={formData.password}
            required
            type="password" />
        </div>

        <button 
          onClick={handleSignIn} 
          type='submit' className='py-[10px] w-full bg-zinc-600 hover:bg-zinc-600/[0.7] rounded-md mt-7'>{loading ? 'loading...' : 'Sign In'}</button>

        <div className='text-center'>
          Don't have an account? <a href="/signup" className='text-blue-500'>sign up</a>
        </div>
        
      </div>
    </main>
  )
}
