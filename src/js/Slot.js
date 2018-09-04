import Reel from './Reel.js';
import Symbol from './Symbol.js';

export default class Slot {
  constructor(domElement) {
    Symbol.preload();

    this.currentSymbols = [
      ['cherry', 'cherry', 'cherry'],
      ['cherry', 'cherry', 'cherry'],
      ['cherry', 'cherry', 'cherry'],
    ];

    this.nextSymbols = [
      ['cherry', 'cherry', 'cherry'],
      ['cherry', 'cherry', 'cherry'],
      ['cherry', 'cherry', 'cherry'],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName('reel')).map((reelContainer, idx) => new Reel(reelContainer, idx, this.currentSymbols[idx]));

    this.spinButton = document.getElementById('spin');
    this.spinButton.addEventListener('click', () => this.spin());

    this.autoPlayCheckbox = document.getElementById('autoplay');
    this.rewardBox = document.getElementById('reward');
    this.jpNode = document.getElementById('jp');
    this.jpVal = parseInt(this.jpNode.value);

    this.win = document.getElementById('win');
    this.reward = 0;
  }

  spin() {
    this.onSpinStart();

    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];
    console.log("NEXT SYMBOLS", this.nextSymbols);
    return Promise.all(this.reels.map(reel => {
      reel.renderSymbols(this.currentSymbols[reel.idx], this.nextSymbols[reel.idx]);
      return reel.spin();
    })).then(() => this.onSpinEnd());
  }

  onSpinStart() {
    this.reward = 0;
    this.rewardBox.style.display = "none";
    this.win.innerHTML = '';
    this.jpVal -= 1;
    console.log(this.jpVal);
    this.jpNode.value = this.jpVal;

    this.spinButton.disabled = true;

    console.log('SPIN START');
  }

  onSpinEnd() {
    this.spinButton.disabled = false;

    console.log('SPIN END');
    
    this.checkReward();
    
    if (this.autoPlayCheckbox.checked) return window.setTimeout(() => this.spin(), 200);
    
  }
  checkIfBar(bar){
    
  }
  checkReward(){
    // 3 cherry symbols on top line
    console.log("Next Symbol", this.nextSymbols[0][0]);

    if((this.nextSymbols[0][0] == 'cherry') && (this.nextSymbols[1][0] == 'cherry') && (this.nextSymbols[2][0] == 'cherry')){
      this.reward += 2000;
    }

    // 3 cherry symbols on center line
    if((this.nextSymbols[0][1] == 'cherry') && (this.nextSymbols[1][1] == 'cherry') && (this.nextSymbols[2][1] == 'cherry')){
      this.reward += 1000;
    }

    // 3 cherry symbols on bottom line 
    if((this.nextSymbols[0][2] == 'cherry') && (this.nextSymbols[1][2] == 'cherry') && (this.nextSymbols[2][2] == 'cherry')){
      this.reward += 4000;
    }

    // 3 7 symbols on any line 
    if((this.nextSymbols[0][0] == '7') && (this.nextSymbols[1][0] == '7') && (this.nextSymbols[2][0] == '7') || 
    (this.nextSymbols[0][1] == '7') && (this.nextSymbols[1][1] == '7') && (this.nextSymbols[2][1] == '7') ||
    (this.nextSymbols[0][2] == '7') && (this.nextSymbols[1][2] == '7') && (this.nextSymbols[2][2] == '7')) {
      this.reward += 150;
    }

    // Any combination of Cherry and 7 on top line
    if((this.nextSymbols[0][0] == 'cherry' || this.nextSymbols[0][0] == '7') && 
      (this.nextSymbols[1][0] == 'cherry' || this.nextSymbols[1][0] == '7') && 
      (this.nextSymbols[2][0] == 'cherry' || this.nextSymbols[2][0] == '7') ){
        this.reward += 75;
    }
    
    // Any combination of cherry and 7 on center line
    if((this.nextSymbols[0][1] == 'cherry' || this.nextSymbols[0][1] == '7') && 
      (this.nextSymbols[1][1] == 'cherry' || this.nextSymbols[1][1] == '7') && 
      (this.nextSymbols[2][1] == 'cherry' || this.nextSymbols[2][1] == '7') ){
        this.reward += 75;
    }
    // Any combination of cherry and 7 on bottom line
    if((this.nextSymbols[0][2] == 'cherry' || this.nextSymbols[0][2] == '7') && 
      (this.nextSymbols[1][2] == 'cherry' || this.nextSymbols[1][2] == '7') && 
      (this.nextSymbols[2][2] == 'cherry' || this.nextSymbols[2][2] == '7') ){
      this.reward += 75;
    }

    // 3xBAR symbols on top 
    if((this.nextSymbols[0][0] == '3xbar') && (this.nextSymbols[1][0] == '3xbar') && (this.nextSymbols[2][0] == '3xbar')){
      this.reward += 50;
    }

    // 3xBAR symbols on center 
    if((this.nextSymbols[0][1] == '3xbar') && (this.nextSymbols[1][1] == '3xbar') && (this.nextSymbols[2][1] == '3xbar')){
      this.reward += 50;
    }

    // 3xBAR symbols on bottom 
    if((this.nextSymbols[0][2] == '3xbar') && (this.nextSymbols[1][2] == '3xbar') && (this.nextSymbols[2][2] == '3xbar')){
      this.reward += 50;
    }
  
    // 2xBAR symbols on top 
    if((this.nextSymbols[0][0] == '2xbar') && (this.nextSymbols[1][0] == '2xbar') && (this.nextSymbols[2][0] == '2xbar')){
      this.reward += 20;
    }

    // 2xBAR symbols on center 
    if((this.nextSymbols[0][1] == '2xbar') && (this.nextSymbols[1][1] == '2xbar') && (this.nextSymbols[2][1] == '2xbar')){
      this.reward += 20;
    }

    // 2xBAR symbols on  bottom 
    if((this.nextSymbols[0][2] == '2xbar') && (this.nextSymbols[1][2] == '2xbar') && (this.nextSymbols[2][2] == '2xbar')){
      this.reward += 20;
    }

    
    // BAR symbols on top 
    if((this.nextSymbols[0][0] == 'bar') && (this.nextSymbols[1][0] == 'bar') && (this.nextSymbols[2][0] == 'bar')){
      this.reward += 10;
    }

    // BAR symbols on center 
    if((this.nextSymbols[0][1] == 'bar') && (this.nextSymbols[1][1] == 'bar') && (this.nextSymbols[2][1] == 'bar')){
      this.reward += 10;
    }

    // BAR symbols on  bottom 
    if((this.nextSymbols[0][2] == 'bar') && (this.nextSymbols[1][2] == 'bar') && (this.nextSymbols[2][2] == 'bar')){
      this.reward += 10;
    }
    
    for(var i=0; i<this.nextSymbols.length; i++){
      let count = 0
      for(var j = 0; j < this.nextSymbols[i].length; j++){
        if(this.nextSymbols[j][i] == '3xbar' || this.nextSymbols[j][i] == '2xbar' || this.nextSymbols[j][i] == 'bar'){
          count += 1;
        }
      }

      if(count == 3 ) {
        this.reward += 5; 
      }
    }
    
    if(this.reward > 0){
      this.win.innerHTML += this.reward;
      this.jpVal += this.reward;
      this.jpNode.value = this.jpVal;
      this.rewardBox.style.display = "flex";
    }
  }
}
