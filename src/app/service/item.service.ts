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
    add(number: number): ItemModel {
        // 使用扩展运算符创建新对象并更新 id 属性
        return new ItemModel(this.data.map(item => {
            item.id + number;
            return item;
        }) as TestItem[]);
    }
    changeIndexName(name: string, _index: number): ItemModel {
        if (_index >= this.data.length || _index < 0) {
            return new ItemModel(this.data);
        }
        return new ItemModel(this.data.map((item, index) => {
            if (_index == index) {
                item.testName = name;
            }
            return item;
        }));
    }
    changeIndexOfName(name: string, id: number): ItemModel {
        return new ItemModel(this.data.map(item => {
            if (item.id == id) {
                item.testName = name;
            }
            return item;
        }))
    }
}