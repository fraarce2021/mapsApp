import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { FullscreenComponent } from './pages/fullscreen/fullscreen.component';
import { MarkersComponent } from './pages/markers/markers.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    FullscreenComponent,
    MarkersComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
