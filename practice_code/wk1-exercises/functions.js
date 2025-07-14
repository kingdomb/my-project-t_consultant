const user = {
  name: 'KB',
  sayHi: function () {
  setTimeout(function () {
    console.log(`Hi, I'm ${this.name}`); // ❌ undefined because reg. function has its own this context pointing to its lexical (defined) scope
  }, 1000);
}
};

user.sayHi();




const trainer = {
  name: 'KB',
  skill: 'React Native',
  regularFunc: function () {
    console.log('regularFunc:', this.name); // A = 'regularFunc:KB' // the lexical scope of this is regularFunc which points to trainer
    setTimeout(function () {
      console.log('regularFunc > setTimeout:', this.name); // B = 'regularFunc > setTimeout:undefined' // the lexical scope of this is its own context which points to another function
    }, 500);
  },
  arrowFunc: function () {
    console.log('arrowFunc:', this.name); // C = 'arrowFunc:undefined' // the lexical scope of this is its own context of undefined
    setTimeout(() => {
      console.log('arrowFunc > setTimeout:', this.name); // D = 'arrowFunc > setTimeout:KB' // this points to arrowFunc which is bound to trainer
    }, 500);
  },
};

trainer.regularFunc();
trainer.arrowFunc();

