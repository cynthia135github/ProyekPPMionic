import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TampillistPage } from './tampillist.page';

describe('TampillistPage', () => {
  let component: TampillistPage;
  let fixture: ComponentFixture<TampillistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TampillistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TampillistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
