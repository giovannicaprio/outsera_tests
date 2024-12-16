import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table'; // Importando MatTableDataSource
import { MatTableModule } from '@angular/material/table'; // Importando MatTableModule
import { ApiService, WinnerYearsResponse, StudioWinnerResponse, MinMaxIntervalsResponse, MinMaxInterval, Movie } from './api.service'; // Import the ApiService

@Component({
  selector: 'app-root',
  standalone: true, // Adicione esta linha se você estiver usando componentes autônomos
  imports: [RouterOutlet, MatTableModule], // Adicione MatTableModule aqui
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'golden-raspberry-dashboard';




  // Data sources for the tables
  dataSource1 = new MatTableDataSource<any>();
  dataSource2 = new MatTableDataSource<any>();
  dataSource3: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // Initialize as MatTableDataSource
  dataSourceMax: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // For max intervals
  dataSourceMin: MatTableDataSource<MinMaxInterval> = new MatTableDataSource(); // For min intervals

  dataSource4: Movie[] = []; // Assuming this is already defined for movie winners

  searchYear: number; // Property to hold the year input
  movieWinners: Movie[] = []; // Property to hold the fetched movie winners


  // Define the columns to be displayed for each table
  displayedColumns1: string[] = ['year', 'winnerCount'];
  displayedColumns2: string[] = ['name', 'winCount'];
  displayedColumns3: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  displayedColumns4: string[] = ['name', 'graYear'];
  displayedColumnsMax: string[] = ['producer', 'interval', 'previousWin', 'followingWin']; // Define columns for max intervals
  displayedColumnsMin: string[] = ['producer', 'interval', 'previousWin', 'followingWin']; // Define columns for min intervals


  constructor(private apiService: ApiService) {}
  ngOnInit() {

    this.apiService.getDataSource1().subscribe(
      (response: WinnerYearsResponse) => {
        this.dataSource1.data = response.years;
      },
      error => {
        console.error('Error fetching winner years:', error);
      }
    );

    this.apiService.getDataSource2().subscribe(
      (response: StudioWinnerResponse) => {
        this.dataSource2.data = response.studios;
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

  
  // Method to search for movie winners by year
  searchMoviesByYear() {
    if (this.searchYear) {
      this.apiService.getMoviesByYear(this.searchYear).subscribe(
        (response: Movie[]) => {
          this.movieWinners = response; // Store the fetched movie winners
          console.log('Movie winners for year', this.searchYear, ':', this.movieWinners);
        },
        error => {
          console.error('Error fetching movie winners:', error);
        }
      );
    }
  }
}
}