import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Movie {
  year: string;
  title: string;
  id: string;
  winner: boolean; 
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
  public apiUrl_winner_years = 'https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners'; 
  public apiUrl_top_distributors = 'https://challenge.outsera.tech/api/movies?projection=studios-with-win-count'; 
  public apiUrlMinMaxIntervals = 'https://challenge.outsera.tech/api/movies?projection=max-min-win-interval-for-producers'; // Endpoint for min-max intervals  
  private baseUrl = '/api/movies';
  constructor(private http: HttpClient) {}




  getData_Winners_Years(): Observable<WinnerYearsResponse> {
    console.log('Fetching apiUrl_winner_years from API...');
    return this.http.get<WinnerYearsResponse>(this.apiUrl_winner_years).pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }

  getData_top3_studios(): Observable<StudioWinnerResponse> {
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
    return this.http.get<Movie[]>(`${this.baseUrl}?winner=true&year=${year}`);
  }

  getMovies() : Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}?winner=true&year=1989`);
  }

  getMoviesByYearAndWinner(): Observable<Movie[]> {
//    return this.http.get<Movie[]>(`${this.baseUrl}?winner=${winner}&year=${year}`);
    return this.http.get<Movie[]>(`${this.baseUrl}?winner=false&year=2018`);
  }

  // Método para buscar filmes com base no ano e no status de vencedor
  getMoviesByFilters(year: number | null, winner: boolean | null): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}?winner=${winner}&year=${year}`);
  }
  
}