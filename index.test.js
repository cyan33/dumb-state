const createState = require('./index');

describe('creates a state management tool that could undo and redo', () => {
  let state;

  beforeEach(() => {
    state = createState({ age: 24 });
  });

  it('can undo and redo', () => {
    for (let i = 1; i <= 10; i++) {
      state.set({ age: 24 + i });
      expect(state.get()).toEqual({ age: 24 + i });
    };
    
    expect(state.undo().get()).toEqual({ age: 33 });
    expect(state.undo().get()).toEqual({ age: 32 });
    expect(state.undo().get()).toEqual({ age: 31 });

    expect(state.redo().get()).toEqual({ age: 32 });

    state.set({ age: 99 });

    expect(state.get()).toEqual({ age: 99 });
    expect(state.redo().get()).toEqual({ age: 99 });

    // can use function as callback
    expect(state.set((prevState) => ({
      age: prevState.age + 1,
    })).get()).toEqual({ age: 100 });

    expect(state.undo().get()).toEqual({ age: 99 });
  });
});
