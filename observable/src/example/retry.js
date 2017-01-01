retryWhen(errs =>
    errs
        .delay(1000)
        .take(5)
        .concat(Observable.throw('bad'))
)

