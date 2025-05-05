import { Component, OnInit } from '@angular/core';
import { ItemController } from '@service/item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  constructor(private itemService: ItemController) { }
  ngOnInit() {
    this.itemService.item$.subscribe(data => {
      this.data = data;
      console.log(this.data);
    });

    this.itemService.itemController([
      { id: 2, testName: 'Test 2' },
      { id: 1, testName: 'Test 1' }
    ]);

    setTimeout(() => {
      this.itemService.itemController()
        .sort((a, b) => a.id - b.id)
        .map((item, index) => {
          item.testName = (index == 1) ? "123" : "456";
          return item;
        });
    }, 5000);


    const test = gold => gold.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    console.log(test(78462159));
  }
}
