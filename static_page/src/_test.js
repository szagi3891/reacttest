var numbers = range(1, 10);
numbers = map(numbers, (n) => n * n );
numbers = reverse(numbers);
foreach(numbers, console.log);

/* output:

   100
   81
   64
   49
   36
   25
   16
   9
   4
   1
*/

//range

const range = (min, max) => {
    if (min === max) {
        return;
    } else {
        
    }
};


range => (number, number) -> stream<number>
map => (stream<number>, (number) -> number) -> stream<number>
reverse => (stream<number>) -> stream<number>
foreach (stream<number>, (number) -> void) -> void
console.log => (number) -> void

const range = (min, max) => (app) => {
    for (const i=0; i<=max; i++) {
        app(i)
    }
}

const map = (app, mapper) => (app2) => {
    app2(mapper(app));
};

const foreach => ()



var numbers = range(1, 10);
foreach(numbers, console.log);

(()=>{

    const range = (min, max) => (app) => {             //app: (numner)->void
        for (let i=min; i<=max; i++) {
            app(i);
        }
    };

    //stream<numeric> ... ((number) -> void) -> void)
    //number -> number
    //stream<numeric> ... ((number) -> void) -> void)

    const map = (streamProcuder, mapper) => (exec) => {
        streamProcuder((value) => exec(mapper(value)));
    };

    //stream<numeric> ... ((number) -> void) -> void)

    const foreach = (stream, exec) => {                 //((number) -> void) -> void
        stream(exec);
    };


    const aaa = range(1,10);
    const bbb = map(aaa, (n) => n * n );
    foreach(bbb, console.log);

})();

(() =>{

    function *range(min, max) {
        for (let i=min; i<=max; i++) {
            yield i;
        }
    } 

    function *map(source, mapper) {
        for (const item of source) {
            yield mapper(item);
        }
    }

    function *emptyList() {
    }

    function *reverseList(rest, head) {
        yield head
        yield* rest
    }

    function *reverse(it) {
        let list = emptyList()
        for (let i of it) {
            list = reverseList(list, i);
        }
        yield* list
    }

    const foreach = (source, executor) => {
        for (const item of source) {
            executor(item)
        }
    };

    const number1 = range(1, 10);
    const number2 = map(number1, (n) => n * n );
    number3 = reverse(number2);
    foreach(number3, console.log); 
})();

(() => {
    function *emptyList() {
    }

    function *reverseList(rest, head) {
        yield head
        yield* rest
    }
    function *hh() {
        yield 1;
        yield 2;
        yield 3;
    }

    function *gg() {
        const fff = gg();

        for 
    }
})();

/*
    for (const dd of map(range(2,5), x => x*x)) {
        console.warn(dd);
    }
*/


https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Operatory/yield*

Zadanie :
http://lisperator.net/blog/a-little-javascript-problem/

var numbers = range(1, 10);
numbers = map(numbers, function (n) { return n * n });
numbers = reverse(numbers);
foreach(numbers, console.log);

/* output:

   100
   81
   64
   49
   36
   25
   16
   9
   4
   1
*/




https://jsfiddle.net/fdmx0hyv/8/

cons    = (f,r) => (c) => c ? f : r 
first   = (c) => c(true)
rest    = (c) => c(false)
range   = (min, max) => min < max ? cons(min, range(min+1,max)) : cons(max,null)
map     = (xs,f) => xs ? cons(f(first(xs)), map(rest(xs),f)) : null
foreach = (xs,f) => { if(xs) { f(first(xs)); foreach(rest(xs),f) }}
reverse = (xs, acc) => !xs ? acc : reverse(rest(xs), cons(first(xs),acc))



https://jsfiddle.net/3spujam4/

range = (a, b) => f => a < b ? f(a, range(a + 1, b)) : f(b, null)
map = (l, func) => !l ? null : f => l((elem, rest) => f(func(elem), map(rest, func)))
append = (l, to_add) => f => !l ? f(to_add, null) : l((elem, rest) => f(elem, append(rest, to_add)))
reverse = l => !l ? null : f => l((elem, rest) => append(reverse(rest), elem)(f))
foreach = (l, func) => !l ? null : l((elem, rest) => {func(elem); foreach(rest, func)})



https://codepen.io/Jedrski/pen/xqNpZJ?editors=0011

function range(from, to) {
  return f => {
    f(from);
    return from - to? range(++from, to) : null;
  }
}

function map(stream, mutation) {
  return stream && (f => map(stream(value => f(mutation(value))), mutation))
}

function reverse(stream, next = null) {
  let value;
  return stream? reverse(stream(v => value = v), f => {f(value); return next}) : next;
}

function foreach(stream, f) {
  while(stream) {
    stream = stream(f);
  }
}



http://www.jsfuck.com/




const range = (a, b) => (f) => { for (let i = a; a <= b; a++) f(a) };
const foreach = (stream, f) => stream(f);
const map = (stream, f) => (g) => stream((i) => g(f(i)));



