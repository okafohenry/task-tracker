export interface T {
    id: number | string;
    name: string;
    description: string;
    dueDate: string;
    column: string;
 }

export interface TaskProps {
    tasks: T[]
}