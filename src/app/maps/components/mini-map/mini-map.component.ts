import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
      div{
        width:100%;
        height:150px;
        margin:0;
      }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [number,number] = [0,0];
  @ViewChild('map') divMap!: ElementRef;

  constructor() { }

  ngAfterViewInit(){
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.lngLat[0],this.lngLat[1]],
      zoom: 16,
      interactive:false,
    });

    new mapboxgl.Marker()
    .setLngLat(this.lngLat)
    .addTo(map);
  }

}
