// 1. Predict the exact output of each console.log:
console.log('Total:', 10 + 5);
console.log('Total' + 10 + 5);
console.log('Total:', 10, 5);
console.log(`Total: ${10 + 5}`);

// 2. Write a function that remembers how many times it has been called, even after being returned.

// 3. Use destructuring to extract the first item from this array and rename it to `firstItem`:
const groceries = ['milk', 'eggs', 'cheese'];

// 4. Rewrite the following to correctly print the name using `this`:
const account = {
  name: 'Savings',
  print() {
    setTimeout(function () {
      console.log(`Account: ${this.name}`);
    }, 500);
  }
};
account.print();

// 5. Write a promise that resolves after 1 second and logs "done". Then chain another `.then()` to log "all complete".

// 6. Predict the output and explain why `this` behaves the way it does.
const user = {
  name: 'KB',
  sayHi: function () {
    setTimeout(function () {
      console.log(`Hi, I'm ${this.name}`);
    }, 1000);
  }
};
user.sayHi();

// 7. Use the spread operator to clone the following object and update only the age.
const user2 = { name: 'KB', age: 25 };

// 8. Write a function that accepts any number of arguments and returns their sum.

// 9. Identify and fix the scoping issue in the code below:
function scopeTest() {
  let x = 10;
  if (true) {
    var y = 20;
    const z = 30;
  }
  console.log(x);
  console.log(y);
  console.log(z);
}

// 10. Create a closure that returns a counter with increment and reset methods.

// 11. Fix the following code so that only variables declared in the correct scope are accessible. Explain why your fix works.
function testScope() {
  if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
  }
  console.log(a);
  console.log(b);
  console.log(c);
}

// 12. Filter all even numbers and return their doubled value from this array:
const input = [1, 2, 3, 4, 5, 6];

// 13. Chain two asynchronous actions where the second one depends on the result of the first.

// 14. Predict the output of the following and explain why:
let x = [1, 2, 3];
let y = x;
y.push(4);
console.log(x);

let a = 5;
let b = a;
b = 10;
console.log(a);

// 15. Rewrite the following function using a promise:
function fetchData(callback) {
  setTimeout(() => callback('data received'), 1000);
}

// 16. Predict the output and explain:
function Trainer(name) {
  this.name = name;
  setTimeout(() => {
    console.log(this.name);
  }, 300);
}
new Trainer('KB');

// 17. Create two versions of the same function: one using a regular function, the other using an arrow function. Compare how `this` behaves in both.

// 18. Write a function that wraps any fetch call and logs the start and end of the request using an interceptor-like pattern.

// 19. Predict the output and explain:
const trainer = {
  name: 'KB',
  skill: 'React Native',
  regularFunc: function () {
    console.log('regularFunc:', this.name);
    setTimeout(function () {
      console.log('regularFunc > setTimeout:', this.name);
    }, 500);
  },
  arrowFunc: function () {
    console.log('arrowFunc:', this.name);
    setTimeout(() => {
      console.log('arrowFunc > setTimeout:', this.name);
    }, 500);
  },
};
trainer.regularFunc();
trainer.arrowFunc();

// 20. Predict the output of the following and explain:
console.log('Label:', 42);
console.log('Label' + 42);
console.log(`Label:${42}`);
console.log('Label ' + 42);

// 21. Merge the two arrays and double all the values using one function call:
const arr1 = [1, 2];
const arr2 = [3, 4];

// 22. Write a function that uses rest parameters to multiply any number of arguments and return the result.

// 23. Fix the previous code so that it correctly logs "Hi, I'm KB" using any method you prefer:
const user3 = {
  name: 'KB',
  sayHi: function () {
    setTimeout(function () {
      console.log(`Hi, I'm ${this.name}`);
    }, 1000);
  }
};
user3.sayHi();

// 24. Given the following object, extract `name` and `zip` using destructuring:
const person = {
  name: 'KB',
  address: {
    city: 'Atlanta',
    zip: '30301'
  }
};

// 25. Double the values of the array and return the sum, all in one line:
const nums = [1, 2, 3, 4, 5];

// 26. Write a function that accepts another function and a delay, and cancels the execution if called again within that delay (debounce logic).

// 27. Convert the following into a promise:
function doWork(callback) {
  setTimeout(() => callback('done'), 200);
}
