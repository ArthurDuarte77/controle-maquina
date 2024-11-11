import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrApiComponent } from './err-api.component';

describe('ErrApiComponent', () => {
  let component: ErrApiComponent;
  let fixture: ComponentFixture<ErrApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
