// Fix the following buggy code and explain why it fails
// testScope fails for variables b, c because they are accessed outside of the conditional block where they are defined. This is not possible.
function testScope() {
  if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
  }
  console.log(a); // 10
  console.log(b); // error
  console.log(c); // error
}

testScope();

// Fix the following buggy code and explain why it fails
// FIX
function testScope2() {
  if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
    console.log(b); // 20
    console.log(c); // 30

  }
  console.log(a); // 10
}

testScope2();