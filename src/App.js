import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timerLabel: 'Session',
      timeLeft: 25 * 60,
      isRunning: false,
    };

    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.tick = this.tick.bind(this);
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.audio = document.getElementById('beep');
    this.audio.currentTime = 0;
    this.audio.addEventListener('ended', () => {
      this.audio.currentTime = 0;
    });
  }

  startStopTimer() {
    if (!this.state.isRunning) {
      this.setState({
        isRunning: true,
      });
      this.timerInterval = setInterval(this.tick, 1000);
    } else {
      clearInterval(this.timerInterval);
      this.setState({
        isRunning: false,
      });
    }
  }

  tick() {
    if (this.state.timeLeft === 0) {
      this.audio.play();
      this.setState(prevState => ({
        timeLeft: prevState.timerLabel === 'Session' ? prevState.breakLength * 60 : prevState.sessionLength * 60,
        timerLabel: prevState.timerLabel === 'Session' ? 'Break' : 'Session',
      }));
    } else {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1,
      }));
    }
  }

  resetTimer() {
    this.audio.pause();
    this.audio.currentTime = 0;

    clearInterval(this.timerInterval); // Clear any existing timer interval
    this.setState({
      sessionLength: 25,
      breakLength: 5,
      timerLabel: 'Session',
      timeLeft: 25 * 60,
      isRunning: false,
    });
  }

  decrementBreak() {
    if (this.state.breakLength > 1) {
      this.setState({
        breakLength: this.state.breakLength - 1
      });
    }
  }

  incrementBreak() {
    if (this.state.breakLength < 60) {
      this.setState({
        breakLength: this.state.breakLength + 1
      });
    }
  }

  decrementSession() {
    if (this.state.sessionLength > 1) {
      this.setState({
        sessionLength: this.state.sessionLength - 1,
        timeLeft: (this.state.sessionLength - 1) * 60
      });
    }
  }

  incrementSession() {
    if (this.state.sessionLength < 60) {
      this.setState({
        sessionLength: this.state.sessionLength + 1,
        timeLeft: (this.state.sessionLength + 1) * 60
      });
    }
  }

  render() {
    const { timerLabel, timeLeft, isRunning, breakLength, sessionLength } = this.state;
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    const formattedTime = `${minutes}:${seconds}`;

    return (
      <div>
        <h1>25+5 Clock</h1>
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={this.decrementBreak}>-</button>
        <span id="break-length">{breakLength}</span>
        <button id="break-increment" onClick={this.incrementBreak}>+</button>
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={this.decrementSession}>-</button>
        <span id="session-length">{sessionLength}</span>
        <button id="session-increment" onClick={this.incrementSession}>+</button>
        <div id="timer-label">{timerLabel}</div>
        <div id="time-left">{formattedTime}</div>
        <audio id="beep" ref={this.audioRef} src="https://www.soundjay.com/buttons/sounds/button-2.mp3" type="audio/mpeg" />
        <button id="start_stop" onClick={this.startStopTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button id="reset" onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
}

export default App;
