import startOfYear from 'date-fns/startOfYear'
import endOfYear from 'date-fns/endOfYear'

class PTOState {
  static key() {
    return 'pto-state';
  }

  static default() {
    const now = new Date();

    return {
      activeStep: 0,
      unit: 'hour',
      frequency: 'biweekly',
      amount: 4.62,
      cap: 264,
      reset: 'never',
      from: startOfYear(now),
      to: endOfYear(now),
      start: 0,
      used: 0,
    };
  }

  static save(state) {
    localStorage.setItem(this.key(), JSON.stringify(state));
  }

  static load() {
    let previousState = localStorage.getItem(this.key());

    if (previousState) {
      previousState = JSON.parse(previousState);
      previousState.from = new Date(previousState.from);
      previousState.to = new Date(previousState.to);
    }

    return previousState || this.default();
  }
}

export default PTOState;
