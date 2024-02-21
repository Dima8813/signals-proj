import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeRoutingModule } from './home-routing.module';
import { CategoryService, TransactionService } from './services';
import {
  CategoriesComponent,
  TransactionsComponent,
  TransactionsTableComponent,
} from './components';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    TransactionsComponent,
    CategoriesComponent,
    TransactionsTableComponent,
  ],
  imports: [
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [CategoryService, TransactionService],
})
export class HomeModule {}
