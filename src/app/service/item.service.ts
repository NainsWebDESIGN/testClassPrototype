import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

interface TestItem {
    id: number;
    testName: string;
}

@Injectable()
export class ItemController {
    private item: TestItem[] = [];
    private itemSubject = new BehaviorSubject<TestItem[]>(this.item);
    item$ = this.itemSubject.asObservable();
    constructor() { }
    itemController(items?: TestItem[]) {
        const itemModel = new ItemModel((!items) ? this.item : items);
        this.item = itemModel.data;
        this.itemSubject.next(this.item);

        return itemModel;
    }
}

class ItemModel {
    data: TestItem[];
    constructor(items: TestItem[]) {
        this.data = items;
    }
    print(): ItemModel {
        console.log(this.data);
        return this;
    }
    // 新增 forEach 方法
    forEach(callback: (item: TestItem, index: number, array: TestItem[]) => void): void {
        this.data.forEach(callback);
    }
    // 新增 map 方法
    map(callback: (item: TestItem, index: number, array: TestItem[]) => TestItem): ItemModel {
        this.data = this.data.map(callback);
        return this;
    }
    // 新增 filter 方法
    filter(callback: (item: TestItem, index: number, array: TestItem[]) => boolean): ItemModel {
        this.data = this.data.filter(callback);
        return this;
    }
    // 新增 sort 方法
    sort(callback: (a: TestItem, b: TestItem) => number): ItemModel {
        this.data = this.data.sort(callback);
        return this;
    }

}