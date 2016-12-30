import Rx from 'rxjs';

const subject = new Rx.BehaviorSubject(0);

subject.subscribe(
  (value) => console.log(`1 subscribe ${value}`),
  (err) => console.log(`1 subscribe error ${err}`),
  () => console.log(`1 complete`)
);

subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
    console.info('podpinam zapóźnionego subskrybenta');

    subject.subscribe(
      (value) => console.log(`2 subscribe ${value}`),
      (err) => console.log(`2 subscribe error ${err}`),
      () => console.log(`2 complete`)
    );  
}, 3000);