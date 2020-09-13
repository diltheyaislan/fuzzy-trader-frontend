import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAssetComponent } from './portfolio-asset.component';

describe('PortfolioAssetComponent', () => {
  let component: PortfolioAssetComponent;
  let fixture: ComponentFixture<PortfolioAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
