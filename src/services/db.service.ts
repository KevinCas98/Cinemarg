/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable no-var */
/* eslint-disable prefer-const */

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Movies } from './movies';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class DbService {
  private storage: SQLiteObject;
  moviesList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'cinemarg_db.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  };
  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchMovies(): Observable<Movies[]> {
    return this.moviesList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql',
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getMovies();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getMovies(){
    return this.storage.executeSql('SELECT * FROM movies', []).then(res => {
      let items: Movies[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            title: res.rows.item(i).title,
            movieDesc: res.rows.item(i).movie_desc,
            yearReleased: res.rows.item(i).year_released,
            genre: res.rows.item(i).genre,
           });
        }
      }
      this.moviesList.next(items);
    });
  }
  // Add
  addMovie(title, movieDesc, yearReleased, genre) {
    let data = [title, movieDesc, yearReleased, genre];
    return this.storage.executeSql('INSERT INTO movies (title, movie_desc, year_released, genre) VALUES (?, ?, ?, ?)', data)
    .then(res => {
      this.getMovies();
    });
  }

  // Get single object
  getMovie(id): Promise<Movies> {
    return this.storage.executeSql('SELECT * FROM movies WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        title: res.rows.item(0).title,
        movieDesc: res.rows.item(0).movie_desc,
        yearReleased: res.rows.item(0).year_released,
        genre: res.rows.item(0).genre
      }
    });
  }
  // Update
  updateMovie(id, movie: Movies) {
    let data = [movie.title, movie.movieDesc, movie.yearReleased, movie.genre];
    return this.storage.executeSql(`UPDATE movies SET title = ?, movie_desc = ?, year_released = ?, genre = ? WHERE id = ${id}`, data)
    .then( data => {
      this.getMovies();
    })
  }
  // Delete
  deleteMovie(id) {
    return this.storage.executeSql('DELETE FROM movies WHERE id = ?', [id])
    .then(_ => {
      this.getMovies();
    });
  }
}
function then(arg0: (db: SQLiteObject) => void) {
  throw new Error('Function not implemented.');
}

