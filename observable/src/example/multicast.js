import Rx from 'rxjs';

const createStream = (max, time) =>
  new Rx.Observable(obs => {
    var count = 1;
    var inter = setInterval(() => {
        obs.next(count);
        count++;

        if (count > max) {
          clearInterval(inter);
          obs.complete();
        }
    }, time);
  }); 
;

const stream1 = createStream(2, 1000).map(v => `stream1: ${v}`);
const stream2 = createStream(4, 500).map(v => `stream2: ${v}`);

const stream3 = stream1.merge(stream2);

const connectable = stream3.multicast(new Rx.Subject());

connectable.connect();  //odpal wykonywanie

connectable.subscribe(
  (value) => console.log(`subscribe ${value}`),
  (err) => console.log(`subscribe error ${err}`),
  () => console.log(`complete`)
);

setTimeout(() => {
  //closeClick$.withLastestFrom(response$
  connectable.subscribe(
    (value) => console.log(`subscribeXX ${value}`),
    (err) => console.log(`subscribeXX error ${err}`),
    () => console.log(`completeXX`)
  );
  
}, 1500);