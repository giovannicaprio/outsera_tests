import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // Importando MatTableDataSource
import { MatTableModule } from '@angular/material/table'; // Importando MatTableModule
import { ApiService, WinnerYearsResponse, StudioWinnerResponse, MinMaxIntervalsResponse, MinMaxInterval, Movie } from './api.service'; // Import the ApiService
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true, // Adicione esta linha se você estiver usando componentes autônomos
  imports: [RouterOutlet, MatTableModule, FormsModule, CommonModule], // Adicione MatTableModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'golden-raspberry-dashboard';




  // Data sources for the tables
  data_Winners_Years = new MatTableDataSource<any>();
  // Define the columns to be displayed for each table
  displayedColumns_Winners_Years: string[] = ['year', 'winnerCount'];
  
  
  data_top3_studios = new MatTableDataSource<any>();
  displayedColumns_top3_studios: string[] = ['name', 'winCount'];


  dataSource3: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // Initialize as MatTableDataSource
  dataSourceMax: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // For max intervals
  dataSourceMin: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // For min intervals

  dataSource4: Movie[] = []; // Assuming this is already defined for movie winners

  searchYear: number | null = null; // or 0
  movieWinners: Movie[] = []; // Property to hold the fetched movie winners


  displayedColumns3: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  displayedColumns4: string[] = ['title', 'year', 'id']; 
  displayedColumnsMax: string[] = ['producer', 'interval', 'previousWin', 'followingWin']; // Define columns for max intervals
  displayedColumnsMin: string[] = ['producer', 'interval', 'previousWin', 'followingWin']; // Define columns for min intervals


  constructor(private apiService: ApiService) {}
  ngOnInit() {
    
    this.apiService.getData_Winners_Years().subscribe(
      (response: WinnerYearsResponse) => {
        console.log('Received response:', response);
        this.data_Winners_Years.data = response.years;
      },
      error => {
        console.log('tesse');

        console.error('Error fetching winner years:', error);
      }
    );

    this.apiService.getData_top3_studios().subscribe(
      (response: StudioWinnerResponse) => {
        this.data_top3_studios.data = response.studios.slice(0, 3);
      },
      error => {
        console.error('Error fetching winner years:', error);
      }
    );

    // Fetch min-max intervals
    this.apiService.getMinMaxIntervals().subscribe(
      (response: MinMaxIntervalsResponse) => {
        this.dataSourceMax = new MatTableDataSource(response.max); // Set max intervals
        this.dataSourceMin = new MatTableDataSource(response.min); // Set min intervals
        console.log('Max Intervals:', this.dataSourceMax);
        console.log('Min Intervals:', this.dataSourceMin);
      },
      error => {
        console.error('Error fetching min-max intervals:', error);
      }
    );
  }

    // Method to search for movie winners by year
    searchMoviesByYear() {
      if (this.searchYear !== null && this.searchYear > 0) {
        this.apiService.getMoviesByYear(this.searchYear).subscribe(
          (response: Movie[]) => {
            this.movieWinners = response; // Store the fetched movie winners
            console.log('Movie winners for year', this.searchYear, ':', this.movieWinners);
          },
          error => {
            console.error('Error fetching movie winners:', error);
          }
        );
      } else {
        console.error('Please enter a valid year.');
      }
    }
}