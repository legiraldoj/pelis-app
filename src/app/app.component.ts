import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movide.model';
import { MatDialog } from '@angular/material/dialog';
import { MovieEditModalComponent } from './movie-edit-modal/movie-edit-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const dafaultImg = "https://wallpapercave.com/wp/wp3184652.jpg";
    this.movieService.getMovies()
      .subscribe(
        movies => {
          this.movies = movies.map(movie=>({
            id: movie.id,
            url: movie.primaryImage?.url ?? dafaultImg,
            name: movie.titleText.text
          }));
        },
      );
  }

  addMovie(): void {
    const dialogRef = this.dialog.open(MovieEditModalComponent, {
      width: '250px',
      data: { title: "Add a new movie"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const defaultUrl = "https://e0.pxfuel.com/wallpapers/52/50/desktop-wallpaper-interstellar-for-iphone-and-ipad-vertical-interstellar-thumbnail.jpg"
        this.movies.unshift({
          id: result,
          url:  defaultUrl,
          name: result
        })
      }
    });    
  }

  openEditDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieEditModalComponent, {
      width: '250px',
      data: { title: "Edit movie", movieName: movie.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.movies.findIndex(m => {
          return m.id === movie.id;
        });
        this.movies[index] = {...this.movies[index], name: result};
      }
    });
  }

  deleteMovie(movie: Movie): void {
    this.movies = this.movies.filter(m => m.id != movie.id)
  }
}