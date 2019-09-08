import { Component, EventEmitter,OnInit, ViewChild, TemplateRef, ViewContainerRef, NgModule, ElementRef, ViewChildren, ContentChildren, Renderer2, ContentChild, Directive, AfterContentInit, forwardRef, QueryList, Output } from '@angular/core';
import { TabComponent } from './tab.component';
import { TabTitleComponent } from './tab-title.component';
import { TabContentComponent } from './tab-content.component';

export interface ITab {
  Title: string;
  Body: string;
}

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['../../styles.css'],
})
export class TabsComponent implements AfterContentInit { 
  @Output()
  selected: EventEmitter<number> = new EventEmitter<number>();
  @ContentChildren(TabTitleComponent, { read: ElementRef,descendants: true }) itemsTitle: QueryList<ElementRef>;
  @ContentChildren(TabContentComponent, { read: ElementRef,descendants: true }) itemsContent: QueryList<ElementRef>;
  public tabsTitle: string[] = [];
  public tabsContent: string[] = [];
  private active: Number = -1;
  public counts: number = 0;
  constructor() { }
  changeTabs() {
    let tabsTitleAr = this.itemsTitle.toArray();
    let tabsContentAr= this.itemsContent.toArray();
    if (tabsTitleAr.length == 0 || tabsContentAr.length != tabsTitleAr.length) {
      return;
    }
    let tabsTitle: string[] = [];
    for (let i = 0; i < tabsTitleAr.length; i++) {
      tabsTitle[tabsTitle.length] = tabsTitleAr[i].nativeElement.innerHTML as string;      
    }
    this.tabsTitle = tabsTitle;   
    let tabsContent: string[] = [];
    for (let i = 0; i < tabsContentAr.length; i++) {
      tabsContent[tabsContent.length] = tabsContentAr[i].nativeElement.innerHTML as string;      
    }
    this.tabsContent = tabsContent;    
    if (this.active === -1) this.active = 0;
    if (this.active > this.tabsTitle.length - 1) this.active = this.tabsTitle.length - 1;
    if (this.counts > tabsTitleAr.length && tabsTitleAr.length > 0) {
      this.active = 0;
    }
    this.counts = tabsTitleAr.length;
  }
  select(i: number) {
    this.active = i;
    this.selected.emit(i);
  }
  ngAfterContentInit() {
    this.itemsTitle.changes.subscribe(() => {
      setTimeout(() => this.changeTabs(),10);
    });
    this.changeTabs();
    
  }

}
