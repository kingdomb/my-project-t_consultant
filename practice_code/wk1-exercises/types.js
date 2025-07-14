// Explain the output
// The output is 1 2 3 because data structures are passed by reference which points to a space in memory so any changes wills affect the original data structure
let x = [1, 2, 3];
let y = x;
y.push(4);
console.log(x); // 1, 2, 3, 4

// The output is 5 because primatives are passed by value which creates a new copy and any changes to the copy does not affect the original value
let a = 5;
let b = a;
b = 10;
console.log(a); // 5
