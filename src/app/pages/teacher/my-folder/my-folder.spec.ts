import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFolder } from './my-folder';

describe('MyFolder', () => {
  let component: MyFolder;
  let fixture: ComponentFixture<MyFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFolder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
