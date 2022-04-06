const { performance } = require('perf_hooks');

console.log('--- Array ---\n');

let a = new Array();

let t0 = performance.now();
a.push('foo');
let t1 = performance.now();
console.log("Adding to array takes " + (t1 - t0) + " milliseconds");

t0 = performance.now();
a.indexOf('foo');
t1 = performance.now();
console.log("Searching for an element in array takes " + (t1 - t0) + " milliseconds");

t0 = performance.now();
a.pop(0);
t1 = performance.now();
console.log("Removing from array takes " + (t1 - t0) + " milliseconds");

console.log('\n--- Set ---\n');

a = new Set();

t0 = performance.now();
a.add('foo');
t1 = performance.now();
console.log("Adding to set takes " + (t1 - t0) + " milliseconds");

t0 = performance.now();
a.has('foo');
t1 = performance.now();
console.log("Searching for an element in set takes " + (t1 - t0) + " milliseconds");

t0 = performance.now();
a.delete('foo');
t1 = performance.now();
console.log("Removing from set takes " + (t1 - t0) + " milliseconds");