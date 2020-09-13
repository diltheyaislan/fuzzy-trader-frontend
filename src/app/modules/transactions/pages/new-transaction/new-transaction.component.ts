import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { CryptocurrenciesService } from 'src/app/core/services/cryptocurrencies.service';
import { NotificationService } from 'src/app/core/services/notification.service';

import CompanyModel from 'src/app/shared/models/company.model';
import CryptocurrencyModel from 'src/app/shared/models/cryptocurrency.model';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  public form: FormGroup;
  public processing: boolean = false;

  public amount: number = undefined;
  public companies: CompanyModel[] = undefined;
  public currencies: CryptocurrencyModel[] = undefined;

  constructor(
    private fb: FormBuilder,
    private companiesServices: CompaniesService,
    private cryptocurrenciesService: CryptocurrenciesService,
    private notificationService: NotificationService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.buildForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.processing = true;

      this.amount = this.form.value.amount;

      this.loadCompanies();
    }
  }

  loadCompanies() {
    this.companiesServices.all()
      .subscribe(
        response => {
          this.companies = response;
          this.loadCryptocurrencies();
        },
        error => this.handleError(error)
      );
  }

  loadCryptocurrencies() {
    this.cryptocurrenciesService.all()
      .subscribe(
        response => {
          this.currencies = response;
          this.processing = false;
        },
        error => this.handleError(error)
      );
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`An error has occurred: ${msg}`);
  }

  onReset(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the reset?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buildForm();
        this.amount = undefined;
      }
    });
  }

  private buildForm(){
    this.form = this.fb.group({
      amount: this.fb.control('', [Validators.required]),
    });
  }
}
