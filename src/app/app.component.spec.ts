import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Subject } from 'rxjs/Subject';
import { AppComponent } from './app.component';
import { SomeService } from './some.service';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [SomeService]
    });
  }));

  it('should display a spinner after 300 ms until instant is available', fakeAsync(() => {
    const someService = TestBed.get(SomeService);
    const subject = new Subject<string>();
    spyOn(someService, 'getFoo').and.returnValue(subject);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    tick();

    expect(fixture.nativeElement.querySelector('.spinner')).toBeFalsy();

    tick(350);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.spinner')).toBeTruthy();

    subject.next('2017-08-09T12:00:00.000Z');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.spinner')).toBeFalsy();
  }));
});
