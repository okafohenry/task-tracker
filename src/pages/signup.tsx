import { useRouter } from 'next/router';
import { setToken, setUser } from '../redux/reducers/userReducer';
import UserService from '../services/users.services';
import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
  name: '',
  email:'',
  password: '',
  password_confirmation: ''
}

export default function Signup() {
    // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const userService = new UserService();
  const dispatch = useDispatch();
  const router = useRouter();
  const inputStyle = "w-full text-black font-normal px-[12px] py-[10px] rounded-[6px] border border-gray-50 outline-black";

  const handleSignUp = () => {
    if(formData.name === '' || formData.email === '' || formData.password === ''){
        toast.error('Ensure no field is empty!');
        return;
    };

    if(formData.password !== formData.password_confirmation){
        toast.error('Passwords must match!');
        return;
    }

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setLoading(true);
      try {
        userService.SignUp(formData)
        .then((res) => {
            setLoading(false);
            if(res?.errors){
                toast.error(res?.message)
            }else{
                toast.success('Account created successfully!');
                dispatch(setUser(res?.user));
                dispatch(setToken(res?.token));
                localStorage.setItem('tracka-token', res?.token);
                router.push('/')
            }

            // navigate('/tasks'); 
        })
      }catch(err: any){
        setLoading(false);
        toast.error(err)
      }
    }else {
      toast.error('Email format incorrect!');
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
        <h1 className='lg:text-3xl text-xl font-bold mb-4'>Create Account</h1>
      </div>

      <div className="absolute top-[9.6rem] grid gap-y-6 lg:w-[30%] w-[80%] lg:px-[2rem] pt-[2rem] pb-[3rem] rounded-md px-3 mx-auto bg-zinc-800 shadow-md">
        <div>
          <label>Full name</label><br />
          <input
            className={`${inputStyle}`} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
            value={formData.name}
            required
            type="text" />
        </div>
        <div>
          <label>Email</label><br />
          <input
            className={`${inputStyle}`} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
            value={formData.email}
            required
            type="email" />
        </div>
        <div>
          <label>Password</label><br />
          <input
            className={`${inputStyle}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, password: e.target.value})}
            value={formData.password}
            required
            type="password" />
        </div>
        <div>
          <label>Confirm Password</label><br />
          <input
            className={`${inputStyle}`}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, password_confirmation: e.target.value})}
            value={formData.password_confirmation}
            required
            type="password" />
        </div>

        <button 
          onClick={handleSignUp} 
          type='submit' className='py-[10px] w-full bg-zinc-600 hover:bg-zinc-600/[0.7] rounded-md mt-7'>{ loading ? 'Creating account...' : 'Sign Up' }</button>

        <div className='text-center'>
          Already have an account? <a href="/" className='text-blue-500'>sign in</a>
        </div>
        
      </div>
    </main>
  )
}
