import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  static favoriMovies: Movie[];

  getFavoriMovies(){
    return FavoritesComponent.favoriMovies;
  }
  constructor() {
    setTimeout(function(){
      setInterval(function(){
        FavoritesComponent.favoriMovies = JSON.parse(localStorage.getItem("favoritesList"));
        if (FavoritesComponent.favoriMovies == null) {
          FavoritesComponent.favoriMovies = new Array<Movie>();
        }
      }, 200);
    }, 700);
   }

  ngOnInit(): void {
  }

  removeToFavorites(movie: Movie) {
    console.log("yes work");
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
    console.log(DBFavorites);
    movie.isFavori = false;
    localStorage.setItem("favoritesList", JSON.stringify(DBFavorites));
  }

}
