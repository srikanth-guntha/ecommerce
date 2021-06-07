import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { FeaturesCartRoutingModule } from './features-cart.routing.module';

@NgModule({
  imports: [CommonModule, FeaturesCartRoutingModule],
  declarations: [CartComponent],
})
export class FeaturesCartModule {}
