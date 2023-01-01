export class DefaultFilter {
    skipRecords: number = 0;
    takeRecords: number = 15;
    constructor() {

    }
}

export class TaskFilter extends DefaultFilter {
    id: number;
    completed: boolean;
    assigneeId: number;
    constructor() {
        super()
    }
}