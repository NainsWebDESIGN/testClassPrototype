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
      { id: 1, testName: 'Test 1' },
      { id: 2, testName: 'Test 2' }
    ]);

    setTimeout(() => {
      this.itemService.itemController()
        .changeIndexName("Index", 1)
        .changeIndexOfName("IndexOf", 1);
    }, 5000);
  }
}
