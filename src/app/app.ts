import { Component } from '@angular/core';
import { MainContent } from "./components/main-content/main-content";
@Component({
  selector: 'app-root',
  imports: [MainContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'css-flex-layout-practice';
}
