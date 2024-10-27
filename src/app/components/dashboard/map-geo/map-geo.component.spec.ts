import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapGeoComponent } from './map-geo.component';

describe('MapGeoComponent', () => {
  let component: MapGeoComponent;
  let fixture: ComponentFixture<MapGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapGeoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
