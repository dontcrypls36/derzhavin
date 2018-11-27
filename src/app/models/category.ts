import { GroupItem } from './group-item';

export class Category {
    uuid: string;
    descr: string;
    count: number;
    groups: GroupItem[] = [];
}
