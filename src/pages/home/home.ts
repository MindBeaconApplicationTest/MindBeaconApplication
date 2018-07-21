import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ImageViewerController } from 'ionic-img-viewer';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  skip: number = 0;
  take: number = 15;
  iterationLimit: number = 50;
  apiEndpoint: string = 'https://5ad8d1c9dc1baa0014c60c51.mockapi.io/api/br/v1/magic';
  images: any = [];
  constructor(public navCtrl: NavController, public http: Http, public imageViewerCtrl: ImageViewerController) {
    this.loadPhotos(0, 0, null);
  }

  loadPhotos(found: number, iterations: number = 0, scroller) {
    this.skip++;
    this.http.get(this.apiEndpoint + '/' + this.skip)
    .map(res => { return res.json(); })
    .toPromise()
    .then(data => {
      console.log(data)
      if(data.id !== undefined) {
        this.images.push(data);
        if(found < this.take && iterations < this.iterationLimit){
          found++;
          iterations++;
          this.loadPhotos(found, iterations, scroller);
        }
        else {
          console.log('total reached')
          if(scroller != null)
            scroller.complete();
        }
      }
    })
    .catch(error => {
      if(found < this.take && iterations < this.iterationLimit){
        iterations++;
        this.loadPhotos(found, iterations, scroller);
      }
      else if(iterations >= this.iterationLimit && scroller != null) {
        scroller.complete();
      }
    });
  }

  showImage(img) {
    let element = document.getElementById('img' + img.id);
    const imageViewer = this.imageViewerCtrl.create(element);
    imageViewer.present();
  }

  doInfinite(infiniteScroll) {
    this.loadPhotos(0, 0, infiniteScroll);
  }
}
