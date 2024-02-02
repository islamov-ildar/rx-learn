import {debounceTime, distinctUntilChanged, fromEvent, map, Observable, takeUntil, tap} from "rxjs";

// const search$ = new Observable<Event>(observer => {
//   console.log('Start in observable');
//   const search = document.getElementById('search');
//   const stop = document.getElementById('stop');
//
//   console.log('search', search)
//
//   if (!search || !stop) {
//     observer.error('Element not found');
//     return
//   }
//
//   const onSearch = (event: Event) => {
//     console.log(123);
//     checkSubscription();
//     observer.next(event);
//   }
//
//   const onStop = () => {
//     checkSubscription();
//     observer.complete();
//     clear();
//   }
//
//   search.addEventListener('input', onSearch);
//   stop.addEventListener('click', onStop);
//
//   const checkSubscription = () => {
//     if(observer.closed) clear();
//   }
//
//   const clear = () => {
//     search.removeEventListener('input', onSearch);
//     stop.removeEventListener('click', onStop);
//   }
//
//   console.log('End in observable');
// });

const search = document.getElementById('search');
const search$: Observable<Event> = fromEvent<Event>(search!, 'input');

const stop = document.getElementById('stop');
const stop$: Observable<Event> = fromEvent<Event>(stop!, 'click');

// if (search) {
//   search$ = fromEvent<Event>(search, 'input');
// }

console.log('Start subscribe');

// search$.subscribe({
//     next: val => {
//       console.log('subscribe1')
//       console.log(val)
//     },
//     error: error => {
//       console.log(error)
//     },
//     complete: () => {
//       console.log('Complete')
//     }
//   }
// );
// const searchSubscription =  search$.pipe(
search$.pipe(
  // tap(val => console.log('tap1', val)),
  map(event => (event.target as HTMLInputElement).value),
  // tap(val => console.log('tap2', val)),
  debounceTime(1000),
  map(val => val.length > 3 ? val : ''),
  distinctUntilChanged(),
  takeUntil(stop$),
)
  .subscribe(val => {
    console.log('subscribe2')
    console.log(val)
  });
console.log('End subscribe');

// const stopSubscription = stop$.subscribe(() => {
//   searchSubscription.unsubscribe();
//   stopSubscription.unsubscribe();
//   console.log('unsubscribed!');
// })
// setTimeout(() => {
//   console.log('unsubscribed!');
//   searchSubscription.unsubscribe()
// }, 10000)
