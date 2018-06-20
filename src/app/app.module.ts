import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { GotComponent } from './got/got.component';
import { GotService } from './got/got.service';
import {GotWikiService} from './got/got-wiki.service';


@NgModule({
  declarations: [
    AppComponent,
    GotComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GotService, GotWikiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
