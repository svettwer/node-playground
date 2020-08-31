import {fibonacci} from "./fibonacci";

(function () {
    const n = 7;
    let fibNumber = fibonacci(n);
    console.log(`\nfibonacci(${n})=${fibNumber}`)
}());