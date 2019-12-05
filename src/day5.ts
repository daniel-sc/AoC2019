const readline = require('readline');

// @ts-ignore
const state = [3, 225, 1, 225, 6, 6, 1100, 1, 238, 225, 104, 0, 1002, 92, 42, 224, 1001, 224, -3444, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 224, 223, 223, 1102, 24, 81, 225, 1101, 89, 36, 224, 101, -125, 224, 224, 4, 224, 102, 8, 223, 223, 101, 5, 224, 224, 1, 224, 223, 223, 2, 118, 191, 224, 101, -880, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 7, 224, 1, 224, 223, 223, 1102, 68, 94, 225, 1101, 85, 91, 225, 1102, 91, 82, 225, 1102, 85, 77, 224, 101, -6545, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 7, 224, 224, 1, 223, 224, 223, 1101, 84, 20, 225, 102, 41, 36, 224, 101, -3321, 224, 224, 4, 224, 1002, 223, 8, 223, 101, 7, 224, 224, 1, 223, 224, 223, 1, 188, 88, 224, 101, -183, 224, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 7, 224, 1, 224, 223, 223, 1001, 84, 43, 224, 1001, 224, -137, 224, 4, 224, 102, 8, 223, 223, 101, 4, 224, 224, 1, 224, 223, 223, 1102, 71, 92, 225, 1101, 44, 50, 225, 1102, 29, 47, 225, 101, 7, 195, 224, 101, -36, 224, 224, 4, 224, 102, 8, 223, 223, 101, 6, 224, 224, 1, 223, 224, 223, 4, 223, 99, 0, 0, 0, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 107, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 329, 1001, 223, 1, 223, 1108, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 344, 101, 1, 223, 223, 1107, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 359, 101, 1, 223, 223, 8, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 374, 1001, 223, 1, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 389, 1001, 223, 1, 223, 1008, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 404, 1001, 223, 1, 223, 108, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 419, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 434, 101, 1, 223, 223, 1008, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 449, 1001, 223, 1, 223, 107, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 464, 1001, 223, 1, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 479, 1001, 223, 1, 223, 1108, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 494, 1001, 223, 1, 223, 8, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 509, 1001, 223, 1, 223, 7, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 524, 101, 1, 223, 223, 1008, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 539, 101, 1, 223, 223, 107, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 554, 1001, 223, 1, 223, 1108, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 569, 101, 1, 223, 223, 108, 226, 226, 224, 1002, 223, 2, 223, 1005, 224, 584, 1001, 223, 1, 223, 7, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 599, 1001, 223, 1, 223, 108, 226, 677, 224, 1002, 223, 2, 223, 1006, 224, 614, 101, 1, 223, 223, 1007, 677, 677, 224, 1002, 223, 2, 223, 1006, 224, 629, 101, 1, 223, 223, 7, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 644, 101, 1, 223, 223, 1007, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 659, 1001, 223, 1, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226];
// const state = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
// const state = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
// const state = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
// const state = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
// const state = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
// const state = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
/*const state = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31,
    1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104,
    999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99];*/
// const state = [];
// const state = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
// const state = [1, 1, 1, 4, 99, 5, 6, 0, 99];
// const state = [2, 4, 4, 5, 99, 0];
// const state = [2, 3, 0, 3, 99];
// const state = [1, 0, 0, 0, 99];

// console.debug = () => undefined;

function param(paramValue: number, paramMode: string, state: number[]): number {
    switch (paramMode) {
        case '0':
        case undefined:
        case '':
            console.debug(`using position mode (v=${paramValue}) : `, state[paramValue]);
            return state[paramValue];
        case '1':
            console.debug(`using immediate mode (v=${paramValue}): `, paramValue);
            return paramValue;
        default:
            console.warn('unexpected paramMode: ', paramMode);
    }
}

function updateState(pos: number, value: number) {
    console.debug(`update pos ${pos} : ${state[pos]} -> ${value}`);
    state[pos] = value;
}

function compute(state: number[]) {
    let i = 0;
    while (state[i] !== 99) {
        if (Math.max(state[i + 3]/*, state[i + 2], state[i + 1]*/) >= state.length) {
            console.warn('too high state!');
        }
        const l = `${state[i]}`.length;
        const opcode = l >= 2 ? `${state[i]}`.substr(l - 2) : `${state[i]}`;
        const parameterModes = l >= 2 ? `${state[i]}`.substr(0, l - 2).split('').reverse() : [];
        console.debug(`command=${state[i]}, opcode=${opcode}, parameterModes: `, parameterModes);
        let commandLength = 4; // default
        switch (opcode) {
            case '01':
            case '1':
                updateState(state[i + 3], param(state[i + 1], parameterModes[0], state) + param(state[i + 2], parameterModes[1], state));
                // updateState(param(state[i + 3], parameterModes[3], state), param(state[i + 1], parameterModes[1], state) + param(state[i + 2], parameterModes[2], state));
                break;
            case '02':
            case '2':
                updateState(state[i + 3], param(state[i + 1], parameterModes[0], state) * param(state[i + 2], parameterModes[1], state));
                // updateState(param(state[i + 3], parameterModes[3], state), param(state[i + 1], parameterModes[1], state) * param(state[i + 2], parameterModes[2], state));
                break;
            case '03':
            case '3':
                const input = '5';
                // state[param(state[i + 1], parameterModes[1], state)] = parseInt(input);
                // updateState(param(state[i + 1], parameterModes[1], state), parseInt(input));
                updateState(state[i + 1], parseInt(input));
                commandLength = 2;
                break;
            case '04':
            case '4':
                console.log('output: ', param(state[i + 1], parameterModes[0], state));
                commandLength = 2;
                break;
            case '05':
            case '5':
                if (param(state[i + 1], parameterModes[0], state) !== 0) {
                    i = param(state[i + 2], parameterModes[1], state);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '06':
            case '6':
                if (param(state[i + 1], parameterModes[0], state) === 0) {
                    i = param(state[i + 2], parameterModes[1], state);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '07':
            case '7':
                if (param(state[i + 1], parameterModes[0], state) < param(state[i + 2], parameterModes[1], state)) {
                    updateState(state[i + 3], 1);
                } else {
                    updateState(state[i + 3], 0);
                }
                commandLength = 4;
                break;
            case '08':
            case '8':
                if (param(state[i + 1], parameterModes[0], state) === param(state[i + 2], parameterModes[1], state)) {
                    updateState(state[i + 3], 1);
                } else {
                    updateState(state[i + 3], 0);
                }
                commandLength = 4;
                break;
            default:
                console.error(`unexpected state at i=${i}:`, state);
                return null;
        }
        // console.log(`new state   (${state.length}): ` + state.join(', '));
        i = i + commandLength;
    }
    return state[0];
}

console.log('result: ', compute(state));

