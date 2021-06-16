import { Component, OnDestroy, OnInit } from '@angular/core';
import { BadgeService } from '@ecommerce/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ecommerce-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public navList: string[] = [];
  public badgeNumber!: number;
  subscription: Subscription = new Subscription();

  constructor(private badgeService: BadgeService) {}

  ngOnInit(): void {
    this.displayNavList();
  }

  displayNavList() {
    this.navList = ['search', 'cart', 'collection'];
    this.badgeNumber = JSON.parse(localStorage.getItem('cart') || '[]').length;
    this.subscription = this.badgeService
      .onMessage()
      .subscribe((data: { number: number }) => {
        this.badgeNumber = data.number;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
