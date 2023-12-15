export interface T {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    column: string;
 }

export interface TaskProps {
    tasks: T[]
}