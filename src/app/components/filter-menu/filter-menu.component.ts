import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonCheckbox, MenuController } from '@ionic/angular';
import { CategoryModel } from 'src/app/models/categoryModel';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss'],
})
export class FilterMenuComponent implements OnInit {
  @Output('checkbox') checkbox: EventEmitter<any> = new EventEmitter<any>();
  @Input('categories') categories: CategoryModel[] = [];

  collapsed: boolean;

  @ViewChild('checkbox', {static: false}) ionCheckbox: IonCheckbox;

  constructor(private menuController: MenuController,
              private router: Router) { }

  ngOnInit() {
    this.collapsed = true;
  }

  onClick() {
    this.collapsed = !this.collapsed;
  }

  checkboxSelected(e: any) {
    this.menuController.close('filter').then();

    this.checkbox.emit({
      name: e.target.name,
      selected: e.target.checked
    })
  }

  closeMenu() {
    this.menuController.close('filter').then();
  }

}
