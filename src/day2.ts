const state = [1, 12, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 10, 1, 19, 1, 6, 19, 23, 1, 23, 13, 27, 2, 6, 27, 31, 1, 5, 31, 35, 2, 10, 35, 39, 1, 6, 39, 43, 1, 13, 43, 47, 2, 47, 6, 51, 1, 51, 5, 55, 1, 55, 6, 59, 2, 59, 10, 63, 1, 63, 6, 67, 2, 67, 10, 71, 1, 71, 9, 75, 2, 75, 10, 79, 1, 79, 5, 83, 2, 10, 83, 87, 1, 87, 6, 91, 2, 9, 91, 95, 1, 95, 5, 99, 1, 5, 99, 103, 1, 103, 10, 107, 1, 9, 107, 111, 1, 6, 111, 115, 1, 115, 5, 119, 1, 10, 119, 123, 2, 6, 123, 127, 2, 127, 6, 131, 1, 131, 2, 135, 1, 10, 135, 0, 99, 2, 0, 14, 0];
// const state = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
// const state = [1, 1, 1, 4, 99, 5, 6, 0, 99];
// const state = [2, 4, 4, 5, 99, 0];
// const state = [2, 3, 0, 3, 99];
// const state = [1, 0, 0, 0, 99];

function compute(state: number[]) {
    let i = 0;
    while (state[i] !== 99) {
        if (Math.max(state[i + 3], state[i + 2], state[i + 1]) >= state.length) {
            console.warn('to high state!');
        }
        switch (state[i]) {
            case 1:
                state[state[i + 3]] = state[state[i + 1]] + state[state[i + 2]];
                break;
            case 2:
                state[state[i + 3]] = state[state[i + 1]] * state[state[i + 2]];
                break;
            default:
                console.error(`unexpected state at i=${i}:`, state);
                return null;
        }
        // console.log(`new state   (${state.length}): ` + state.join(', '));
        i = i + 4;
    }
    return state[0];
}

for (let a = 0; a < 100; a++) {
    for (let b = 0; b < 100; b++) {
        const s = [...state];
        s[1] = a;
        s[2] = b;
        if (compute(s) === 19690720) {
            console.log('result: ', 100 * a + b);
        }
    }
}

