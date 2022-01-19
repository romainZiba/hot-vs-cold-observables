import './style.css';

import { of, map, Observable, Subject, timer, share, take } from 'rxjs';

const producer = timer(1000, 1000).pipe(share());

const hot = new Observable((observer) => {
  producer.subscribe((value) => observer.next(value));
});

const cold = new Observable((observer) => {
  const producer = timer(1000, 1000).pipe(map((value) => `cold-${value}`));
  producer.subscribe((value) => observer.next(value));
});

hot
  .pipe(take(15))
  .subscribe((value) => console.warn(`HOT First subscriber ${value}`));
cold
  .pipe(take(15))
  .subscribe((value) => console.warn(`COLD First subscriber ${value}`));

setTimeout(() => {
  hot
    .pipe(take(10))
    .subscribe((value) => console.warn(`HOT Second subscriber ${value}`));
  cold
    .pipe(take(10))
    .subscribe((value) => console.warn(`COLD Second subscriber ${value}`));
}, 6000);
