import { useEffect } from "react";
import AppLayout from "../../components/layout/AppLayout";
import TaskBoard from "./components/TaskBoard";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Tasks() {
    const user = useSelector((state: any) => state.user);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('tracka-token');
        if(!token){
            router.push('/')
        }
    }, []);

    return (
        <AppLayout>
             <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Task Tracker</h1>
                <TaskBoard />
            </div>
        </AppLayout>
    )
}


export default Tasks;