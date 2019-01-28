import {Injectable} from '@angular/core';
import {GroupItem} from "../models/group-item";

@Injectable({
  providedIn: 'root'
})
export class GroupForMenuService {

  private group: GroupItem = new GroupItem();

  constructor() { }

  getCurrentGroup(): GroupItem {
    return this.group;
  }

  setCurrentGroup(group: GroupItem) {
    this.group = group;
  }
}
