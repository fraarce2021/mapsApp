import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color:string;
  marker?:mapboxgl.Marker;
  center?:[number,number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .list-group{
        position:fixed;
        top:20px;
        right:20px;
        z-index:99;
      }
      .add-marker, .go-marker, .delete-marker{
        cursor:pointer;
      }
    `
  ]
})
export class MarkersComponent implements AfterViewInit {

  @ViewChild('map') divMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel:number = 15;
  center:[number,number] = [-84.2053, 10.026689];

  //Marker Array
  markers: MarkerColor[]=[];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.readMarkersLocalStorage();
    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hello World!';
    // new mapboxgl.Marker(
    //   {
    //     element: markerHtml
    //   }
    // )
    // .setLngLat(this.center)
    // .addTo(this.map)
  }

  addMarker(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker({
      draggable:true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.map);

      this.markers.push({
        color,
        marker:newMarker
      });
      this.saveMarkersInLocalStorage();

      newMarker.on('dragen',()=>{
        this.saveMarkersInLocalStorage();
      })
  }

  goMarker(value:mapboxgl.Marker){
    this.map.flyTo({
      center:  value.getLngLat()
    });
  }

  saveMarkersInLocalStorage(){
    const lngLatArray: MarkerColor[] = [];

    this.markers.forEach(m=>{
      const color = m.color;
      const {lng,lat} = m.marker!.getLngLat();

      lngLatArray.push({
        color,
        center: [lng,lat]
      });

    });

    localStorage.setItem('markers', JSON.stringify(lngLatArray));
  }

  readMarkersLocalStorage(){
    if (!localStorage.getItem('markers')) {
      return;
    }
    const lngLatArray: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArray.forEach(m=>{
      const newMarker = new mapboxgl.Marker({
        draggable:true,
        color: m.color
      })
      .setLngLat(m.center!)
      .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragen',()=>{
        this.saveMarkersInLocalStorage();
      })
    });
  }

  deleteMarker(index:number){
    this.markers[index].marker?.remove();
    this.markers.splice(index,1);
    this.saveMarkersInLocalStorage();
  }
}
