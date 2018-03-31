import { fakeAsync, tick } from '@angular/core/testing';
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';

class FakeNow {
  private now = new Date();

  constructor() {
    jasmine.clock().mockDate(this.now);
  }

  tickSeconds(seconds: number) {
    this.now = new Date(this.now.getTime() + seconds * 1000);
    jasmine.clock().mockDate(this.now);
    tick(seconds * 1000);
  }
}

describe('clock test', () => {

  afterEach(() => jasmine.clock().uninstall());

  it('should fake the clock in fakeAsync', fakeAsync(() => {
    const start = new Date().getTime();
    let progress = 0;

    const fakeNow = new FakeNow();

    interval(1000).pipe(
      take(3)
    ).subscribe(() => progress = (new Date().getTime() - start) / 1000);

    fakeNow.tickSeconds(1);
    expect(progress).toBe(1);

    fakeNow.tickSeconds(1);
    expect(progress).toBe(2);

    fakeNow.tickSeconds(1);
    expect(progress).toBe(3);

    fakeNow.tickSeconds(1);
    expect(progress).toBe(3);
  }));
});
