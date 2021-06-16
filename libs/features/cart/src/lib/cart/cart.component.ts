import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BadgeService, Book } from '@ecommerce/shared/services';

@Component({
  selector: 'ecommerce-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public cartItems: Book[] = [];
  public showDelete = true;
  constructor(private router: Router, private badgeService: BadgeService) {}

  ngOnInit(): void {
    this.displayCartItems();
  }

  displayCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  proceedToPurchase(cartItems: Book[]) {
    this.router.navigate(['/billing'], {
      queryParams: { data: JSON.stringify(cartItems) },
    });
  }

  deleteCartItem(event: any) {
    this.cartItems = this.cartItems.filter((cartItem) => {
      return event.id !== cartItem.id;
    });
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.badgeService.sendMessage(
      JSON.parse(localStorage.getItem('cart') || '[]').length
    );
  }
}
