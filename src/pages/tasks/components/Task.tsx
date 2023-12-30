// components/Task.js
import { T } from '@components/models/task';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import downIcon from "../../../assets/icons/downIcon.svg";
import arrowIcon from "../../../assets/icons/arrowIcon.svg";
import Image from 'next/image';
import DatePicker from "react-datepicker";
import { formatDateToYYYYMMDD } from '../../../components/custom-hooks';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../../../redux/reducers/taskReducer';
import { toast } from 'react-toastify';
import TaskService from '../../../services/tasks.services';

interface TaskProp {
    task: T,
    index: number
}

const Task = ({ task, index }: TaskProp) => {
  const dispatch = useDispatch();
  const [edit_loading, setEditLoading] = useState(false);
  const [delete_loading, setDeleteLoading] = useState(false);
  const [ showDetails, setShowDetails ] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());
  const [ toggleModal, setToggleModal ] = useState(false);
  const [ item, updateItem ] = useState({
    id: task?.id,
    name: task?.name,
    description: task?.description,
    dueDate: task?.dueDate,
    column: task?.column
  })
  const taskService = new TaskService();

  const handleDateChange = (arg: Date) => {
    const formattedDate = formatDateToYYYYMMDD(arg);
    updateItem({ ...item, dueDate: formattedDate }); 
  };

const handleEdit = () => {
  if(item?.name === "" || item?.description === "") return;

  const data = { name: item?.name, description: item?.description}
  setEditLoading(true);
  taskService.EditTask(item?.id, data)
  .then((res) => {
    setEditLoading(false)
    if(res?.error){
      toast.error(res?.error)
    }else{
      dispatch(editTask(item));
      toast.success('Update successful!');
      setToggleModal(false)
    }
  })
}

const handleDelete = () => {
  setDeleteLoading(true);
  taskService.DeleteTask(item.id)
  .then((res) => {
    setDeleteLoading(false);
    if(res?.error){
      toast.error(res?.error);
    }else{
      dispatch(deleteTask(item.id));
      toast.success('Task deleted successfully!');
      setToggleModal(false)
    }
  })
}

  return (
    <>
      <Draggable draggableId={task?.id?.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="p-4 m-2 bg-white shadow-md rounded-md"
          >
              <div className="flex justify-between items-center" >
                  <h3 
                    onClick={() => setToggleModal(true)} 
                    className="font-semibold text-gray-900 text-[16px]">{task?.name}</h3>
                  <Image 
                    src={showDetails ? arrowIcon : downIcon} alt='dropdown' 
                    onClick={() => setShowDetails(!showDetails)}
                    height={17} width={17} /> 
              </div>
              {showDetails && <p className="text-gray-600 text-[14px]">{task?.description}</p>}
              <p className="text-[11.5px] text-gray-500">Due Date: {formatDateToYYYYMMDD(task?.dueDate)}</p>
          </div>
        )}
      </Draggable>

      { toggleModal  &&
      <div className='fixed z-50 h-[100vh] top-0 left-0 w-full backdrop-blur bg-slate-50/[0.1]'>
        <div className='bg-white lg:w-[30%] w-[80%] mt-[13rem] p-5 mx-auto rounded-md'>
            <input 
              onChange={(e) => updateItem({...item, name: e.target.value})}
              className="font-semibold text-gray-900 text-[18px] mb-3" 
              value={item?.name} /> <br />
            <textarea 
              rows={1} 
              onChange={(e) => updateItem({...item, description: e.target.value})}
              className=" resize-none text-gray-600 text-[16px] mb-3" 
              value={item.description}></textarea>

            <div className="text-[15px] text-gray-500">Due Date: 
              <DatePicker 
                selected={new Date(item.dueDate)}
                className="w-full"
                onSelect={(date) => handleDateChange(date)} //when day is clicked
                onChange={(date: Date) => handleDateChange(date)} //only when value has changed 
              />
            </div>

            <div className='flex justify-between mt-7'>
              <div className='flex gap-x-3'>
                <button onClick={handleEdit} className='px-[20px] text-[13px] py-2 border border-black text-black bg-white rounded-md'>{edit_loading ? 'Editing...' : 'Edit'}</button>
                <button onClick={handleDelete} className='px-[15px] text-[13px] py-2 border border-red-700 bg-red-700 text-white rounded-md'>{delete_loading ? 'Deleting...' : 'Delete'}</button>
              </div>

              <button onClick={() => setToggleModal(false)} className='px-[15px] text-[13px] py-2 border border-gray-400 bg-gray-400 text-white rounded-md'>Cancel</button>
            </div>
        </div>
      </div>
      }
    </>
  );
};

export default Task;
