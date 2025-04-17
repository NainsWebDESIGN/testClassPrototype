import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';

// Service
// import { xxx } from '@service';
import { ItemController } from '@service/item.service';

// Pipe && Component
// import { xxx } from '@pipeModule';
// import { xxx } from '@comModule';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ItemController],
  bootstrap: [AppComponent]
})
export class AppModule { }
