import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Crimeheatmapv2Component } from './crimeheatmapv2.component';

describe('Crimeheatmapv2Component', () => {
  let component: Crimeheatmapv2Component;
  let fixture: ComponentFixture<Crimeheatmapv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Crimeheatmapv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Crimeheatmapv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
