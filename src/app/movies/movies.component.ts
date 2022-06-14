import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { MovieComponent } from './movie/movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  title: string = 'Movie List';
  static movies: Movie[];
  popularMovies: Movie[];
  filteredMovies: Movie[];
  movieRepository: MovieRepository;
  filterText: string = '';

  constructor() {
    this.movieRepository = new MovieRepository();
    MoviesComponent.movies = this.movieRepository.getMovies();
    this.popularMovies = this.movieRepository.getPopularMovies();

    setTimeout(function(){
      setInterval(function(){
        var favoriMovies = JSON.parse(localStorage.getItem("favoritesList"));
        if (favoriMovies == null) {
          favoriMovies = new Array<Movie>();
        }

        for (let i = 0; i < MoviesComponent.movies.length; i++) {
          const movie = MoviesComponent.movies[i];
          var isChange = false;
          for (let j = 0; j < favoriMovies.length; j++) {
            const favoriMovie = favoriMovies[j];
            if(favoriMovie.id == movie.id){
              movie.isFavori = favoriMovie.isFavori;
              isChange = true;
              break;
            }
          }          
          if (!isChange) {
            movie.isFavori = false;
          }
        }
      }, 200);
    }, 700);
  }
  getMovies(){
    return MoviesComponent.movies;
  }


  ngOnInit() {}

  OnInputChange() {
    this.filteredMovies = this.filterText
      ? MoviesComponent.movies.filter(
          (m: Movie) =>
            m.title.toLocaleLowerCase().indexOf(this.filterText) !== -1 ||
            m.description.toLocaleLowerCase().indexOf(this.filterText) !== -1
        )
      : MoviesComponent.movies;
  }

  addToFavorites(movie: Movie) {
    movie.isFavori = true;
    var DBFavorites = JSON.parse(localStorage.getItem("favoritesList"));
    if (DBFavorites != null) {
      DBFavorites.push(movie);
    }
    else{
      DBFavorites = new Array<Movie>();
      DBFavorites.push(movie);
    }
    localStorage.setItem("favoritesList", JSON.stringify(DBFavorites));
  }

  removeToFavorites(movie: Movie) {
    var DBFavorites = JSON.parse(localStorage.getItem("favoritesList"));
    console.log(DBFavorites);
    if (DBFavorites != null) {
      for (let i = 0; i < DBFavorites.length; i++) {
        const mv = DBFavorites[i];
        console.log(mv);
        if (mv.id == movie.id) {
          DBFavorites = DBFavorites.slice(i + 1, 1);
          break;
        }        
      }
    }
    movie.isFavori = false;
    localStorage.setItem("favoritesList", JSON.stringify(DBFavorites));
  }
}