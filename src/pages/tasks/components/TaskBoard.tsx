// components/TaskBoard.js
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskList from './TaskList';
import { addTask, editTask, } from '../../../redux/reducers/taskReducer';



const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks  = useSelector((state: any) => state.tasks.tasks);

  console.log('tasks', tasks)

  const onDragEnd = (result: any) => {
    console.log(result);
    
    const { source, destination, draggableId } = result;

    // Check if the task was dropped outside of any droppable
    if (!destination) return;

    // Check if the task was dropped in a different column
    if (source.droppableId !== destination.droppableId) {
      const updatedTask = { ...tasks.find((task: any) => task.id === Number(draggableId)), column: destination.droppableId };
      console.log('updated', updatedTask)
      console.log('main', tasks)
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
        <TaskList column="Open" tasks={tasks.filter((task: any) => task.column.toLowerCase() === 'open')} />
        <TaskList column="Pending" tasks={tasks.filter((task: any) => task.column.toLowerCase() === 'pending')} />
        <TaskList column="In Progress" tasks={tasks.filter((task: any) => task.column.toLowerCase() === 'in progress')} />
        <TaskList column="Completed" tasks={tasks.filter((task: any) => task.column.toLowerCase() === 'completed')} />
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
