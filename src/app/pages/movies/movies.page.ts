/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from '../../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  editForm: FormGroup;
  id: any;
  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.db.getMovies().then(res => {
      this.editForm.setValue({
        title: res['title'],
        movieDesc: res['movie_desc'],
        yearReleased: res['year_released'],
        genre: res['genre']
      });
    });
  }
  ngOnInit() {
    this.editForm = this.formBuilder.group({
      title: [''],
      movieDesc: [''],
      yearReleased: [''],
      genre: ['']
    });
  }
  saveForm(){
    this.db.updateMovie(this.id, this.editForm.value)
    .then( (res) => {
      console.log(res);
      this.router.navigate(['/main']);
    });
  }
}
