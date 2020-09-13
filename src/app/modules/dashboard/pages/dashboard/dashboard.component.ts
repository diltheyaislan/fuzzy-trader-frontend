import { Component, OnInit } from '@angular/core';

import { NotificationService } from 'src/app/core/services/notification.service';
import { InvestmentPortfolioService } from 'src/app/core/services/investment-portfolio.service';

import CompanyModel from 'src/app/shared/models/company.model';
import CryptocurrencyModel from 'src/app/shared/models/cryptocurrency.model';
import InvestmentPortfolioModel from 'src/app/shared/models/investment-portfolio.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public processing: boolean = false;

  public portfolio: InvestmentPortfolioModel;

  constructor(
    private investmentPortfolioService: InvestmentPortfolioService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadInvestmentPortfolio();
  }

  loadInvestmentPortfolio() {
    this.processing = true;

    this.investmentPortfolioService.show()
      .subscribe(
        success => this.handleSuccess(success),
        error => this.handleError(error)
      );
  }

  private handleSuccess(response) {
    this.processing = false;
    this.portfolio = response;
  }

  private handleError(response) {
    this.processing = false;
    const msg = response.error.message;
    this.notificationService.notify(`An error has occurred: ${msg}`);
  }
}
