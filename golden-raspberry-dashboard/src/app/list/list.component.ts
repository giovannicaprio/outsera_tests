import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Movie } from '../api.service'; // Ajuste o caminho conforme necessário
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator'; // Import MatPaginatorModule
import { FormsModule } from '@angular/forms'; // Importando o FormsModule

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'], // Optional: Add styles if needed
  imports: [CommonModule, MatPaginatorModule, FormsModule], // Adicione MatTableModule aqui
})
export class ListComponent implements OnInit {
  movies: Movie[] = []; // Array to hold the list of movies
  displayedMovies: Movie[] = []; // Para armazenar os filmes a serem exibidos
  pageSize: number = 5; // Número de itens por página
  pageIndex: number = 0; // Índice da página atual
  filterYear: number | null = null; // Year filter
  filterWinner: string | null = null; // Winner filter

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Use non-null assertion

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadMovies(); // Carrega os filmes ao inicializar o componente
  }

  loadMovies() {
    console.log('Chamando os filtros');
    this.apiService.getMoviesByFilters(this.filterYear, this.filterWinner === 'true' ? true : this.filterWinner === 'false' ? false : null)
      .subscribe(
        (data: Movie[]) => {
          this.movies = data; // Assign the fetched data to the movies array
          this.updateDisplayedMovies();
        },
        error => {
          console.error('Error fetching movies:', error); // Handle errors
        }
      );
  }

  updateDisplayedMovies() {
    const startIndex = this.pageIndex * this.pageSize;
    this.displayedMovies = this.movies.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedMovies();
  }

  filterMovies() {
    this.loadMovies(); // Chama a API sempre que os filtros forem alterados
  }

  ngAfterViewInit() {
    // Certifique-se de que o paginator está definido antes de usá-lo
    if (this.paginator) {
      this.paginator.page.subscribe(() => this.updateDisplayedMovies());
    }
  }
}