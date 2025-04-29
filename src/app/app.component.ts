import { Component, OnInit } from '@angular/core';
import { ItemController } from '@service/item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  testSub = new Subscription();
  constructor(private itemService: ItemController) { }
  ngOnInit() {
    this.itemService.item$.subscribe(data => {
      console.log(data);
    });

    this.itemService.itemController([
      { id: 2, testName: 'Test 2' },
      { id: 1, testName: 'Test 1' }
    ]);

    setTimeout(() => {
      this.itemService.itemController()
        .sort((a, b) => a.id - b.id)
        .map(item => {
          item.testName = "987";
          return item;
        });
      // .print()
    }, 5000);
  }
}
