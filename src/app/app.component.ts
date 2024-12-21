import { Component, OnInit } from '@angular/core';

declare function smoothFunction(): any;
declare function themeJs(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rifasWebFrontend';

  ngOnInit(): void {
    smoothFunction();
    themeJs();
  }
}
