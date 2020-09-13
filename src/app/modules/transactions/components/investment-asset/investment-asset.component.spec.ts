import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentAssetComponent } from './investment-asset.component';

describe('InvestmentAssetComponent', () => {
  let component: InvestmentAssetComponent;
  let fixture: ComponentFixture<InvestmentAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
