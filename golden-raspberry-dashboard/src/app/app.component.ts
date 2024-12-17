import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // Importando MatTableDataSource
import { MatTableModule } from '@angular/material/table'; // Importando MatTableModule
import { ApiService, WinnerYearsResponse, StudioWinnerResponse, MinMaxIntervalsResponse, MinMaxInterval, Movie } from './api.service'; // Import the ApiService
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { CommonModule } from '@angular/common'; // Import CommonModule
import { MenuComponent } from './menu/menu.component'; // Adjust the path as necessary

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, MatTableModule, FormsModule, CommonModule, MenuComponent], // Adicione MatTableModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    // Initialization logic can go here if needed
    // For now, you can leave it empty or remove it if not needed
  }
  title = 'Golden Raspberry Dashboard';

  
}