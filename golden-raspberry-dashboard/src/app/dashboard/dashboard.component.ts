import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { ApiService, WinnerYearsResponse, StudioWinnerResponse, MinMaxIntervalsResponse, MinMaxInterval, Movie } from '../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterOutlet, FormsModule, CommonModule, MatTableModule],
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  data_Winners_Years = new MatTableDataSource<any>();
  displayedColumns_Winners_Years: string[] = ['year', 'winnerCount'];
  
  data_top3_studios = new MatTableDataSource<any>();
  displayedColumns_top3_studios: string[] = ['name', 'winCount'];

  dataSourceMax: MatTableDataSource<MinMaxInterval> = new MatTableDataSource();
  dataSourceMin: MatTableDataSource<MinMaxInterval> = new MatTableDataSource();
  
  searchYear: number | null = null;
  movieWinners: Movie[] = [];
  
  loading: boolean = false; // Loading state
  errorMessage: string | null = null; // Error message state

  displayedColumns3: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  displayedColumnsMax: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];
  displayedColumnsMin: string[] = ['producer', 'interval', 'previousWin', 'followingWin'];


  displayedColumns4: string[] = ['year', 'title', 'id'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchWinnersYears();
    this.fetchTopStudios();
    this.fetchMinMaxIntervals();
  }

  fetchWinnersYears(): void {
    this.loading = true; // Set loading to true
    this.apiService.getData_Winners_Years().subscribe(
      (response: WinnerYearsResponse) => {
        this.data_Winners_Years.data = response.years;
        this.loading = false; // Set loading to false
      },
      error => {
        this.loading = false; // Set loading to false
        this.errorMessage = 'Error fetching winner years. Please try again later.';
        console.error('Error fetching winner years:', error);
      }
    );
  }

  fetchTopStudios(): void {
    this.loading = true; // Set loading to true
    this.apiService.getData_top3_studios().subscribe(
      (response: StudioWinnerResponse) => {
        this.data_top3_studios.data = response.studios.slice(0, 3);
        this.loading = false; // Set loading to false
      },
      error => {
        this.loading = false; // Set loading to false
        this.errorMessage = 'Error fetching top studios. Please try again later.';
        console.error('Error fetching top studios:', error);
      }
    );
  }

  fetchMinMaxIntervals(): void {
    this.loading = true; // Set loading to true
    this.apiService.getMinMaxIntervals().subscribe(
      (response: MinMaxIntervalsResponse) => {
        this.dataSourceMax = new MatTableDataSource(response.max);
        this.dataSourceMin = new MatTableDataSource(response.min);
        this.loading = false; // Set loading to false
      },
      error => {
        this.loading = false; // Set loading to false
        this.errorMessage = 'Error fetching min-max intervals. Please try again later.';
        console.error('Error fetching min-max intervals:', error);
      }
    );
  }

  searchMoviesByYear(): void {
    if (this.searchYear !== null && this.searchYear > 0) {
      this.loading = true; // Set loading to true
      this.apiService.getMoviesByYear(this.searchYear).subscribe(
        (response: Movie[]) => {
          this.movieWinners = response;
          this.loading = false; // Set loading to false
          console.log('Movie winners for year', this.searchYear, ':', this.movieWinners);
        },
        error => {
          this.loading = false; // Set loading to false
          this.errorMessage = 'Error fetching movie winners. Please try again later.';
          console.error('Error fetching movie winners:', error);
        }
      );
    } else {
      this.errorMessage = 'Please enter a valid year.';
      console.error('Invalid year input:', this.searchYear);
    }
  }
}