export class Task {
    id: number;
    description: string;
    assigneeId: number;
    completed: boolean;
};

export interface TaskList extends Task {
    assigneeDescription: string;
}