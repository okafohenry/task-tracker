import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid';

import "react-datepicker/dist/react-datepicker.css";
import AppLayout from "../../components/layout/AppLayout";
import { formatDateToYYYYMMDD } from "../../components/custom-hooks";
import TaskService from "../../services/tasks.services";
import { toast } from "react-toastify";
import { addTask } from "../../redux/reducers/taskReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const initialState = {
    name: '',
    description: '',
    dueDate: formatDateToYYYYMMDD(new Date()),
    column: 'open'
}

function Home(){
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const user = useSelector((state: any) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const taskService = new TaskService();

    const inputStyle = "text-black font-normal px-[12px] py-[10px] rounded-[6px] border border-gray-50 outline-black";

    useEffect(() => {
        const token = localStorage.getItem('tracka-token');
        if(!token){
            router.push('/');
        }
    }, []);

    const handleDateChange = (arg: Date) => {
        const formattedDate = formatDateToYYYYMMDD(arg);
        setFormData({ ...formData, dueDate: formattedDate });  
    };

    const handleAddTask = () => {
        if(formData.name === '' || formData.description === '') return;

        const id = uuidv4();
        const updatedFormData = {...formData, id};

        setLoading(true);
        try {
            taskService.AddTask(updatedFormData)
            .then((res) => {
                setLoading(false)
                if(res?.error){
                    toast.error(res?.error);
                  }else{  
                    setFormData(initialState);
                    const data = {...res, column: 'open', dueDate: res?.created_at}
                    dispatch(addTask(data));
                    toast.success('Task Added Successfully!');
                  }
            })
        }catch(err: any){
            setLoading(false);
            // console.log(err);
            toast.error(err?.message || err?.msg || err)
        }

    }


    return (
        <AppLayout>
           <div className="mt-7">
                <h1 className="text-3xl lg:text-left  text-center font-bold mb-4 lg:ml-7">Create Task</h1>

                <div className="lg:w-2/4 mx-auto grid gap-y-7 mt-[4rem]">
                    <div className="lg:flex grid gap-y-7 gap-x-3">
                        <input
                            type="text"
                            className={`${inputStyle} lg:w-[70%] w-full`}
                            placeholder="Task title"
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            value={formData.name}
                        />
                        <div className={`${inputStyle} lg:w-[30%] w-full bg-white`}>
                            <p className="text-[10px]">Due date</p>
                            <DatePicker 
                                selected={startDate}
                                // placeholderText="Due Date"
                                className="w-full"
                                onSelect={(date) => setStartDate(date)} //when day is clicked
                                onChange={(date: Date) => handleDateChange(date)} //only when value has changed 
                            />
                        </div>
                    </div>

                    <textarea 
                        className={`${inputStyle} w-full resize-none`}
                        placeholder="Description" 
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        value={formData.description}
                        rows={12}>
                    </textarea>

                    <button onClick={handleAddTask} className="w-full font-normal px-[12px] py-[15px] rounded-[6px] bg-zinc-600 hover:bg-zinc-600/[0.7]">{loading ? 'Creating task...' : 'Add Task'}</button>
                </div>
           </div>
        </AppLayout>
    )
}


export default Home