import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from '../../../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  filterTerm: string;
  mainForm: FormGroup;
  data: any[] = [];
  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchMovies().subscribe(item => {
          this.data = item;
        });
      }
    });
    this.mainForm = this.formBuilder.group({
      title: [''],
      movieDesc: [''],
      yearReleased: [''],
      genre: ['']
    });
  }
  storeData() {
    this.db.addMovie(
      this.mainForm.value.title,
      this.mainForm.value.movie_desc,
      this.mainForm.value.year_released,
      this.mainForm.value.genre,
    ).then((res) => {
      this.mainForm.reset();
    });
  }
  deleteMovie(id){
    this.db.deleteMovie(id).then(async (res) => {
      // eslint-disable-next-line prefer-const
      let toast = await this.toast.create({
        message: 'Pelicula Eliminada',
        duration: 1500
      });
      toast.present();
    });
  }

}
