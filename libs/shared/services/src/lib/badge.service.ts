import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  public subject = new Subject<{ number: number }>();
  public badgeSubject = this.subject.asObservable();

  sendMessage(badgeNumber: number) {
    this.subject.next({ number: badgeNumber });
  }

  onMessage(): Observable<{ number: number }> {
    return this.subject.asObservable();
  }
}
