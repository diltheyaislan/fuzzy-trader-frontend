import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { TransactionsService } from 'src/app/core/services/transactions.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-investment-asset',
  templateUrl: './investment-asset.component.html',
  styleUrls: ['./investment-asset.component.css']
})
export class InvestmentAssetComponent implements OnInit {

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  logoUrl: string;

  @Input()
  symbol: string;

  @Input()
  description: string;

  @Input()
  price: number;

  @Input()
  amount: number;

  @Input()
  type: 'share' | 'cryptocurrency';


  processing: boolean = false;
  showDescription: boolean = false;

  constructor(
    private transactionsService: TransactionsService,
    private router: Router,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onBuy() {
    if(this.processing){
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the purchase?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processing = true;
        if(this.type === 'share') {
          this.buyShares();
        } else {
          this.buyCurrencies();
        }
      }
    });
  }

  buyShares() {
    this.transactionsService.buyShares(this.id, this.amount).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error),
    );
  }

  buyCurrencies(){
    this.transactionsService.buyCryptocurrencies(this.id, this.amount).subscribe(
      success => this.handleSuccess(success),
      error => this.handleError(error),
    );
  }

  private handleSuccess(response) {
    this.notificationService.notify('Successful transaction');
    this.router.navigate(['/']);
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`An error has occurred: ${msg}`);
  }

  toggleShowDescription() {
    this.showDescription = !this.showDescription;
  }
}
