// components/TaskList.js
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { T, TaskProps } from '@components/models/task';

interface TaskListProps {
    column: string,
    tasks: any
}

const TaskList = ({ column, tasks }: TaskListProps) => {
  return (
    <Droppable droppableId={column} type="TASK">
      {(provided) => (
        <div
          {...provided?.droppableProps}
          ref={provided?.innerRef}
          className="flex-1 p-4 m-2 bg-gray-100 h-fit max-h-[70vh]  overflow-y-auto rounded-md"
        >
          <h2 className="text-xl text-black font-semibold mb-4">{column}</h2>
          {tasks?.map((task: T, index: number) => (
            <Task key={index} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;
