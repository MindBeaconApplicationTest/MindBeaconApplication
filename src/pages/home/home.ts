import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skip: number = 0;
  take: number = 15;
  constructor(public navCtrl: NavController) {

  }

  loadPhotos() {
    
  }
}
