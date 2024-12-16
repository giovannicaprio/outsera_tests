import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Movie {
  graYear: string;
  winCount: number;
  name: string;
  // Add other properties as needed
}

export interface Studio {
  name: string;
  winCount: number;
  // Add other properties as needed
}

export interface StudioWinnerResponse {
  studios: Studio[];
}

export interface WinnerYear {
  year: number;
  winnerCount: number;
}

export interface WinnerYearsResponse {
  years: WinnerYear[];
}

export interface MinMaxInterval {
  followingWin: number;
  interval: number;
  previousWin: number;
  producer: string;
}

export interface MinMaxIntervalsResponse {
  max: MinMaxInterval[];
  min: MinMaxInterval[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl_winner_years = 'http://127.0.0.1:5000/api/movies/winner_years'; // Replace with your API URL
  private apiUrl_top_distributors = 'http://127.0.0.1:5000/api/movies/top_distributors'; // Replace with your API URL
  private apiUrlMinMaxIntervals = 'http://127.0.0.1:5000/api/producers/min_max_intervals'; // Endpoint for min-max intervals
  private baseUrl = 'http://127.0.0.1:5000/api/movies'; // Base URL for movie-related endpoints
  constructor(private http: HttpClient) {}

  getDataSource1(): Observable<WinnerYearsResponse> {
    console.log('Fetching getDataSource1 from API...');
    return this.http.get<WinnerYearsResponse>(this.apiUrl_winner_years).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  getDataSource2(): Observable<StudioWinnerResponse> {
    console.log('Fetching StudioWinnerResponse from API...');
    return this.http.get<StudioWinnerResponse>(this.apiUrl_top_distributors).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  // Method to fetch min-max intervals
  getMinMaxIntervals(): Observable<MinMaxIntervalsResponse> {
    console.log('Fetching getMinMaxIntervals from API...');
    return this.http.get<MinMaxIntervalsResponse>(this.apiUrlMinMaxIntervals).pipe(
      catchError(error => {
        console.error('Error fetching min-max intervals:', error);
        return throwError(error);
      })
    );
  }
  // Method to get movies by year
  getMoviesByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl }/year/${year}`);
  }




}