import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './Movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

private apiUrl = 'https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/movie.json';
private detailUrl = 'https://raw.githubusercontent.com/Uniandes-isis2603/ISIS2603_202520_S2_Parcial2_json/refs/heads/main/movies/1/movie.json';


  constructor(private http: HttpClient) { }


getMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(this.apiUrl);
}



getMovieDetail(id: number): Observable<Movie> {
  return this.http.get<Movie>(`${this.detailUrl}${id}/movie.json`);
}

}
