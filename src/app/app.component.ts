import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = 'Default theme';
  title = 'personal';
  private style: HTMLStyleElement;
  
  constructor() {
    
  }
  
}


