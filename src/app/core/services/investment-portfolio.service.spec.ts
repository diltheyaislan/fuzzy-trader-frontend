import { TestBed } from '@angular/core/testing';

import { InvestmentPortfolioService } from './investment-portfolio.service';

describe('InvestmentPortfolioService', () => {
  let service: InvestmentPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
