import { Component, OnInit } from '@angular/core';
// @ts-ignore
import * as antDesignTheme from '../../ng-select/themes/ant.design.theme.css';
// @ts-ignore
import * as defaultTheme from '../../../node_modules/@ng-select/ng-select/themes/default.theme.css';
// @ts-ignore
import * as materialTheme from '../../ng-select/themes/material.theme.css';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  collapedSideBar: boolean;
  theme = 'Default theme';
  title = 'personal';
  private style: HTMLStyleElement;
  constructor() {}

  ngOnInit() {}

  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.style = document.createElement('style');
        this.style.type = 'text/css';
        this.style.innerHTML = defaultTheme;
        document.getElementsByTagName('head')[0].appendChild(this.style);
    }, 100);
  }



}
