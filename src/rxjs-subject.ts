import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";

// const subject = new Subject()
// const subject = new BehaviorSubject(0);
const subject = new ReplaySubject(2);

subject.next(1);
subject.next(2);

subject.subscribe(val => console.log('first', val));

subject.next(3);
subject.subscribe(val => console.log('second', val));

subject.next(4);
