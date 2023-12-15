import { request } from "../hooks/api";

class TaskService {
    async AddTask(data: any) {
        try {
        const response = await request(
            "tasks/", 
            "POST", 
            data, 
            false, 
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
            "tasks/", 
            "GET", 
            {}, 
            false, 
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
