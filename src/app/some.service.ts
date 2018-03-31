import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class SomeService {
  getFoo(): Observable<string> {
    return of('2017-08-09T12:00:00.000Z');
  }
}
