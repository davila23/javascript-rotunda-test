
/* 

We are building a zoo inside a computer. Each animal species in our zoo has lots
of different, particular, behaviors, but all animals talk to each other in a similar
way. Specifically, they all implement a speak method, the output of which is the
arbitrary input string interspersed with an "animal sound" that is particular to that
type of animal. For example, the lion's speak function behaves like so: 

> lion.speak( "I'm a lion" );
< "I'm roar a roar lion roar"

The tiger's speak function behaves similarly but with a different sound:

> tiger.speak( "Lions suck" );
< "Lions grrr suck grrr"

*/

// -------------------------------- Model --------------------------------- //

class Animal{

constructor(sound){
    this.sound = sound;
  }
  

/* 
    
 Objective :  Insert the characteristic sound of the animal after each word.
    
 Process:

    split : [ 'I\'m', 'a', 'lion' ]
    map : [ 'I\'m roar', 'a roar', 'lion roar' ]
    join : I'm roar a roar lion roar

*/

speak(sound) {

    let speach = sound.split(' ').map(word => `${word} ${this.sound}`);
  
    return speach.join(' ');
  
    }
  
  }

// ----------------------------- Test Case ------------------------------ //

const lion = new Animal();
lion.sound = 'roar' ;

const tiger  = new Animal();
tiger.sound = 'grr' ;

console.log(lion.speak("I'm a lion"));
console.log(tiger.speak("Lion sucks"));
