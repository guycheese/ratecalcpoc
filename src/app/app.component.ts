import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ratecalcpoc';
  constructor(public router: Router) {}
}
