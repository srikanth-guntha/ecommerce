import { TestBed } from '@angular/core/testing';
import { BadgeService } from './badge.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BadgeService],
    });
    service = TestBed.inject(BadgeService);
  });

  it('#service should created', () => {
    expect(service).toBeTruthy();
  });

  it('# send Message should call', () => {
    spyOn(service.subject, 'next').and.callThrough();
    service.sendMessage(4);
    expect(service.subject.next).toHaveBeenCalledWith({ number: 4 });
  });
  it('# onMessage should defined', () => {
    expect(service.onMessage).toBeDefined();
  });

  it('should return expected data in onMessage subscription ', () => {
    service.onMessage().subscribe((data: { number: number }) => {
      expect(data.number).toEqual(4);
    });
    service.sendMessage(4);
  });
});
