const foo = Rx.Observable.interval(500).map(() => Math.random());

const bar = foo.map(x => {
    if (x < 0.5) {
        return x;
    } else {
        throw new Error('Too large number');
    }
});

const result = bar.catch((e, outputObs) => outputObs);

result.subscribe(
    x => console.log(`next ${x}`),
    err => console.log(`error ${e}`)
    () => console.log('done')
);
