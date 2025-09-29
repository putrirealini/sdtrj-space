import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFolder2 } from './my-folder2';

describe('MyFolder2', () => {
  let component: MyFolder2;
  let fixture: ComponentFixture<MyFolder2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFolder2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFolder2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
