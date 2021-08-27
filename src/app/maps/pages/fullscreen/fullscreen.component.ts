import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles: [
    `
    #map{
      width:100%;
      height: 100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[ -84.205300, 10.026689],
    zoom: 17
    });

  }

}
