// TODO: wait for next version angular
// import { fakeAsync, tick } from '@angular/core/testing';
import { interval } from 'rxjs/observable/interval';
import { take } from 'rxjs/operators';

// after new version of angular released, you can
// use fakeAsync, tick from @angular/core/testing as always
// and don't forget to add flag in 'src/test.ts'.
declare let Zone: any;
const { fakeAsync, tick } = Zone[Zone.__symbol__('fakeAsyncTest')];
describe('clock test', () => {
  beforeEach(jasmine.clock().install);
  afterEach(jasmine.clock().uninstall);

  it('should fake the clock in fakeAsync', () => {
    const start = new Date().getTime();
    let progress = 0;

    interval(1000)
      .pipe(take(3))
      .subscribe(() => (progress = (new Date().getTime() - start) / 1000));

    tick(1000);
    expect(progress).toBe(1);

    tick(1000);
    expect(progress).toBe(2);

    tick(1000);
    expect(progress).toBe(3);

    tick(1000);
    expect(progress).toBe(3);
  });
});
