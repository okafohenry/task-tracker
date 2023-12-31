import { T } from "../models/task";
import { request } from "../hooks/api";

class TaskService {
    async AddTask(data: T) {
        try {
        const response = await request(
            "api/projects", 
            "POST", 
            data, 
            true, 
            false, 
            false
            );
        return response;
        } catch (error) {
        throw error;
        }
    }

    async AllTasks() {
        try {
          const response = await request(
            "api/projects", 
            "GET", 
            {}, 
            true, 
            false, 
            false
            );
          return response;
        } catch (error) {
          throw error;
        }
      }

      async EditTask(id: number | string, data: {name: string, description: string}) {
        try {
          const response = await request(
            `api/projects/${id}`, 
            "PATCH", 
            data, 
            true, 
            false, 
            false
            );
          return response;
        } catch (error) {
          throw error;
        }
      }

      async DeleteTask(id: string | number) {
        try {
          const response = await request(
            `api/projects/${id}`, 
            "DELETE", 
            {}, 
            true, 
            false, 
            false
            );
          return response;
        } catch (error) {
          throw error;
        }
      }

}

export default TaskService;
