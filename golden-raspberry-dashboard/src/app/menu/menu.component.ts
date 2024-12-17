import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu', // This should match the tag in your HTML
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent { 

  constructor(private router: Router) {}

  navigateToList() {
    this.router.navigate(['/list']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }


}

