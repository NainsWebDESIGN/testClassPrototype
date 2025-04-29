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

        itemModel.forEach((item, index) => {
            console.log(`Item at index ${index} has id: ${item.id} and testName: ${item.testName}`);
        })
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

    // 新增 forEach 方法
    forEach(callback: (item: TestItem, index: number, array: TestItem[]) => void): void {
        this.data.forEach((item, index, array) => {
            callback(item, index, array);
        });
    }

    // 新增 map 方法
    map(callback: (item: TestItem, index: number, array: TestItem[]) => TestItem): ItemModel {
        const newData = this.data.map((item, index, array) => {
            return callback(item, index, array);
        });
        return new ItemModel(newData);
    }

    // 新增 filter 方法
    filter(callback: (item: TestItem, index: number, array: TestItem[]) => boolean): ItemModel {
        const newData = this.data.filter((item, index, array) => {
            return callback(item, index, array);
        });
        return new ItemModel(newData);
    }
}