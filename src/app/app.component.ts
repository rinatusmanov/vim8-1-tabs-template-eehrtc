import { Component, NgModule } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
@NgModule({
  declarations: [
    TabsComponent,
  ]
})
export class AppComponent  {
  public numberOfTab: number = 2;
  public tabs = [ 1, 2 ];
  public active: number = 0;
  public dec() {
    this.tabs.splice(this.active, 1);
  }

  public inc() {
    this.numberOfTab++;
    this.tabs = [ ...this.tabs, this.numberOfTab ];
  }

  select(e: number){
    this.active = e;
  }
}
