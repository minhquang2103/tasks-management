export class DefaultFilter {
    skipRecords: number = 0;
    takeRecords: number = 15;
    constructor() {

    }
}

export class TaskFilter extends DefaultFilter {
    searchString: string = "";
    completed: boolean = null;
    constructor() {
        super()
    }
}