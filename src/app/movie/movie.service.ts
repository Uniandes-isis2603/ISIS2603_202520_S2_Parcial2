import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private readonly LIST_URL = "https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/movie.json"

  constructor(private readonly http: HttpClient) { }

  listMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.LIST_URL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getMovieById(id: number | string ): Observable<Movie> {
    const url = `https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/${id}/movie.json`
    return this.http.get<Movie>(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    const message = error?.message ?? 'Error desconocido en la petición HTTP';
    console.error('RecipeService HTTP Error:', error);
    return throwError(() => new Error(message));
  }
}
