import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenemuPage } from './penemu.page';

describe('PenemuPage', () => {
  let component: PenemuPage;
  let fixture: ComponentFixture<PenemuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenemuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenemuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
