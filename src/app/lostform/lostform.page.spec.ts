import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostformPage } from './lostform.page';

describe('LostformPage', () => {
  let component: LostformPage;
  let fixture: ComponentFixture<LostformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
