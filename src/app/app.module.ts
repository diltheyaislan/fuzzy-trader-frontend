import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from './shared/angular-material.module';

import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

import { ContentComponent } from './shared/layout/content/content.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ConfirmationDialogComponent } from './shared/components/confirmation-dialog/confirmation-dialog.component';

import { LoginComponent } from './modules/sessions/pages/login/login.component';
import { LogoutComponent } from './modules/sessions/pages/logout/logout.component';
import { RegisterComponent } from './modules/sessions/pages/register/register.component';
import { DashboardComponent } from './modules/dashboard/pages/dashboard/dashboard.component';
import { NewTransactionComponent } from './modules/transactions/pages/new-transaction/new-transaction.component';
import { InvestmentAssetComponent } from './modules/transactions/components/investment-asset/investment-asset.component';
import { PortfolioAssetComponent } from './modules/dashboard/components/portfolio-asset/portfolio-asset.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent,
    NewTransactionComponent,
    InvestmentAssetComponent,
    PortfolioAssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
