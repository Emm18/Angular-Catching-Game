import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //Will listen to keypress LEFT and RIGHT arrow
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.gameStarted) {
      if (event.keyCode == KEY_CODE.LEFT_ARROW && this.catcher > 0) {
        this.catcher -= 20;
      };
      if (event.keyCode == KEY_CODE.RIGHT_ARROW && this.catcher < 450) {
        this.catcher += 20;
      };
    };
  };

  //For Circle and Player Colors
  circleColor = 'red';
  playerColor = 'red';

  //Game State
  gameStarted: boolean = false;

  //This Will hold the timer
  movingBall;

  //Initial position
  ballX: number = 250;
  ballY: number = 250;
  catcher: number = 230;

  //Where the ball is going
  direction: string = "down";

  //Max top when the ball is going up
  maxTop: number;

  //For speed of the ball and for scoring
  level = [50, 40, 30];
  scoring = [10, 20, 30];
  selectedLevel = 0;

  //For keeping score based on how long will the player keep catching the ball
  currentScore: number = 0;

  //For recording score
  scoreList: number[] = [];

  //Create random color
  changeBallColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    this.circleColor = `rgb(${r},${g},${b})`
  }

  //Create random color
  changePlayerColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    this.playerColor = `rgb(${r},${g},${b})`
  }

  //Add difficulty
  levelUp() {
    if (this.selectedLevel + 1 <= 2) {
      this.selectedLevel++;
    };
  };

  //deduct difficulty
  levelDown() {
    if (this.selectedLevel - 1 >= 0) {
      this.selectedLevel--;
    };
  };

  //Start the game
  startGame() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.movingBall = setInterval(() => {
        if (this.direction == "down") {
          this.ballY += 10;
          if (this.ballY == 480 && this.ballX >= this.catcher && this.ballX <= this.catcher + 50) {
            this.direction = "up";
            this.maxTop = Math.floor(Math.random() * 200);
          };
        };

        if (this.direction == 'up') {
          this.ballY -= 10;
          if (this.ballY <= this.maxTop) {
            this.ballX = Math.floor(Math.random() * 480) + 10;
            this.direction = "down";
          };
        };

        this.currentScore += this.scoring[this.selectedLevel];

        if (this.ballY >= 490) {
          this.ballY += 10;
          this.scoreList.push(this.currentScore);
          this.stopGame();
        };
      }, this.level[this.selectedLevel])
    };
  };

  //Stop the game if the player fails to catch the ball
  stopGame() {
    clearInterval(this.movingBall);
    this.gameStarted = false;
    this.currentScore = 0;
    this.ballX = 250;
    this.ballY = 250;
    this.catcher = 230;
    this.direction = "down";
    this.maxTop = 0;
  }
};

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
};