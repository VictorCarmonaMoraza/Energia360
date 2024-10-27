import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforPLantsComponent } from './infor-plants.component';

describe('InforPLantsComponent', () => {
  let component: InforPLantsComponent;
  let fixture: ComponentFixture<InforPLantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InforPLantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InforPLantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
