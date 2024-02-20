import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeRoutingModule } from './home-routing.module';
import { CategoryService } from './services/category.service';
import { CategoriesComponent, TransactionsComponent } from './components';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, TransactionsComponent, CategoriesComponent],
  imports: [
    HomeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [CategoryService],
})
export class HomeModule {}
