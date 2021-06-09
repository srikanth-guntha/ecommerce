import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '@ecommerce/shared/dialog';
import { BadgeService } from '@ecommerce/shared/services';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'ecommerce-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss'],
})
export class BillingComponent implements OnInit {
  billingForm: FormGroup;
  imagePath: string;
  booksCollection: any = [];
  book: any = {};
  matDialogRef!: MatDialogRef<DialogComponent>;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private matDialog: MatDialog,
    private badgeService: BadgeService
  ) {
    this.imagePath = 'https://images.app.goo.gl/sizfN6GMeUrg7nYa8';
    this.billingForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.book = this.router.snapshot.queryParamMap.get('data');
  }

  submit() {
    if (this.billingForm.invalid) {
      return;
    }
    this.booksCollection.push(
      ...JSON.parse(localStorage.getItem('bookCollection') || '[]')
    );
    if (Array.isArray(JSON.parse(this.book))) {
      this.booksCollection.push(...JSON.parse(this.book));
    } else {
      this.booksCollection.push(JSON.parse(this.book));
    }

    localStorage.setItem(
      'bookCollection',
      JSON.stringify(this.booksCollection)
    );
    localStorage.setItem('cart', JSON.stringify([]));
    this.badgeService.sendMessage(
      JSON.parse(localStorage.getItem('cart') || '[]').length
    );
    this.OpenModal('your order placed successfully');
  }

  OpenModal(message: string) {
    this.matDialogRef = this.matDialog.open(DialogComponent, {
      data: { message },
    });
  }

  CloseDialog() {
    this.matDialogRef.close(false);
  }

  checkError(controlName: string, errorName: string) {
    return this.billingForm.controls[controlName].hasError(errorName);
  }
}
