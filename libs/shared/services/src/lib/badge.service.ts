import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  public subject = new Subject<any>();
  public badgeSubject = this.subject.asObservable();
  constructor() {}

  sendMessage(badgeNumber: number) {
    this.subject.next({ number: badgeNumber });
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
