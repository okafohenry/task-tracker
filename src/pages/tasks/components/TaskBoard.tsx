// components/TaskBoard.js
import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './TaskList';
import { addTask, editTask, } from '../../../redux/reducers/taskReducer';
import { T, TaskProps } from '../../../models/task';
import TaskService from '../../../services/tasks.services';
import { toast } from 'react-toastify';
// import { T } from '@components/models/task'; 



const TaskBoard = () => {
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState<any>({
  //   tasks: []
  // });
  const taskService = new TaskService();
  const tasks  = useSelector((state: any) => state?.tasks.tasks);

  useEffect(() => {
    taskService.AllTasks()
    .then((res) => {
      if(res?.error){
        toast.error(res?.error)
      }else{
        // console.log(res);
      }
    })
  }, [])

  const onDragEnd = (result: any) => {
    
    const { source, destination, draggableId } = result;

    // Check if the task was dropped outside of any droppable
    if (!destination) return;

    // Check if the task was dropped in a different column
    if (source.droppableId !== destination.droppableId) {
      const updatedTask =  { ...tasks?.find((task: any) => task.id === Number(draggableId)), column: destination.droppableId };
      dispatch(editTask(updatedTask));
    }
  };

  // const handleAddTask = () => {
  //   const newTask = {
  //     id: tasks.length + 1,
  //     title: `New Task ${tasks.length + 1}`,
  //     description: '',
  //     dueDate: '2023-12-31',
  //     column: 'open',
  //   };
  //   dispatch(addTask(newTask));
  // };


  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskList column="Open" tasks={tasks?.filter((task: T) => task.column.toLowerCase() === 'open')} />
        <TaskList column="Pending" tasks={tasks?.filter((task: T) => task.column.toLowerCase() === 'pending')} />
        <TaskList column="In Progress" tasks={tasks?.filter((task: T) => task.column.toLowerCase() === 'in progress')} />
        <TaskList column="Completed" tasks={tasks?.filter((task: T) => task.column.toLowerCase() === 'completed')} />
      </DragDropContext>
      {/* <div className="flex-1 p-4 m-2">
        <button onClick={handleAddTask} className="py-2 px-4 bg-blue-500 text-white rounded-md">
          Add Task
        </button>
      </div> */}
    </div>
  );
};

export default TaskBoard;
