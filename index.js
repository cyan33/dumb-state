function createState(initState) {
  // The place where we store all of our history moves, yikes!
  let _history = [initState];
  const _maxHistoryLength = 500;
  
  let _pointer = 0;

  return {
    set(nextPartialState) {
      // discard all of following state records if we change to a new state
      if (_pointer !== _history.length - 1) {
        _history = _history.slice(0, _pointer + 1);
      }

      const currState = _history[_pointer];

      let realNextPartialState;
      if (typeof nextPartialState === 'function') {
        realNextPartialState = nextPartialState(currState);
      } else {
        realNextPartialState = nextPartialState;
      }
      const nextState = Object.assign({}, currState, realNextPartialState);

      _history.push(nextState);
      if (_history.length > _maxHistoryLength) {
        _history.shift();
      }

      _pointer += 1;
      return this;
    },
    get() {
      return _history[_pointer];
    },
    undo() {
      if (_pointer > 0) {
        _pointer -= 1;
      }
      // silently ignore the case where we cannot undo anymore
      return this;
    },
    redo() {
      if (_pointer < _history.length - 1) {
        _pointer += 1;
      }
      // silently ignore the case where we cannot redo anymore
      return this;
    },
  }
}

module.exports = createState;
