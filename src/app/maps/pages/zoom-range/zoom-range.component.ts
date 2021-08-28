import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .row {
        width:400px;
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel:number = 16;
  center:[number,number] = [-84.2053, 10.026689];

  constructor() {}

  ngOnDestroy(){
    this.map.off('zoom', ()=>{});
    this.map.off('zoomend', ()=>{});
    this.map.off('move', ()=>{});
  }

  ngAfterViewInit(){
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.map.on('zoom', ()=>{
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', ()=>{

      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }

    });

    this.map.on('move', (event) =>{
      const target = event.target;
      const {lng, lat} = target.getCenter();
      this.center = [lng,lat];
    })
  }

  zoomOut() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  zoomIn() {
    this.zoomLevel = this.map.getZoom();
    this.map.zoomOut();
  }

  zoomChange(value: string){
    this.map.zoomTo(Number(value))
  }
}
