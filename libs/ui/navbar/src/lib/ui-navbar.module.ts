import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedMaterialModule } from '@ecommerce/shared/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class UiNavbarModule {}
