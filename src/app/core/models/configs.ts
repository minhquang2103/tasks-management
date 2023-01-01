export class Configs {
    type: PageType = PageType.ADD;
    id: number;
}

export enum PageType {
    ADD = "ADD",
    EDIT = "EDIT"
}