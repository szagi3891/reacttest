const interval = Rx.Observable.interval(200);

const getStream = (caption, count) => 
  interval.take(count).map(v => `${caption} ${v} of ${count}`);

const getStreamByIndex = (index) => {
  switch (index) {
    case 0: return getStream("pierwszy", 19);
    case 1: return getStream("drugi   ",  5);
    case 2: return getStream("trzeci  ", 10);
    case 3: return getStream("czwarty ",  2);
    case 4: return getStream("piąty   ",  4);
  }
};

const result = interval
  .take(5)
  .flatMap(index => getStreamByIndex(index));


result.subscribe(
  (value) => console.log(`subscribe ${value}`),
  (err) => console.log(`subscribe error ${err}`),
  () => console.log(`complete`)
);
