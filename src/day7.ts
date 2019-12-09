console.debug = () => undefined;

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

function updateState(pos: number, value: number, state: number[]) {
    console.debug(`update pos ${pos} : ${state[pos]} -> ${value}`);
    state[pos] = value;
}


function run(programState: ProgramState): ProgramState {
    const outputs = [];
    let nextInputIndex = 0;
    const state = programState.state;

    while (true) {
        if (Math.max(state[programState.nextPosition + 3]/*, state[i + 2], state[i + 1]*/) >= state.length) {
            console.warn('too high state!');
        }
        const l = `${state[programState.nextPosition]}`.length;
        const opcode = l >= 2 ? `${state[programState.nextPosition]}`.substr(l - 2) : `${state[programState.nextPosition]}`;
        const parameterModes = l >= 2 ? `${state[programState.nextPosition]}`.substr(0, l - 2).split('').reverse() : [];
        console.debug(`command=${state[programState.nextPosition]}, opcode=${opcode}, parameterModes: `, parameterModes);
        let commandLength = 4; // default
        switch (opcode) {
            case '01':
            case '1':
                updateState(state[programState.nextPosition + 3], param(state[programState.nextPosition + 1], parameterModes[0], state) + param(state[programState.nextPosition + 2], parameterModes[1], state), state);
                break;
            case '02':
            case '2':
                updateState(state[programState.nextPosition + 3], param(state[programState.nextPosition + 1], parameterModes[0], state) * param(state[programState.nextPosition + 2], parameterModes[1], state), state);
                break;
            case '03':
            case '3':
                if (nextInputIndex < programState.remainingInputs.length) {
                    updateState(state[programState.nextPosition + 1], programState.remainingInputs[nextInputIndex], state);
                    nextInputIndex++;
                    commandLength = 2;
                } else {
                    return {
                        ...programState,
                        output: outputs,
                        remainingInputs: programState.remainingInputs.slice(nextInputIndex),
                        exit: false
                    }
                }
                break;
            case '04':
            case '4':
                outputs.push(param(state[programState.nextPosition + 1], parameterModes[0], state));
                commandLength = 2;
                break;
            case '05':
            case '5':
                if (param(state[programState.nextPosition + 1], parameterModes[0], state) !== 0) {
                    programState.nextPosition = param(state[programState.nextPosition + 2], parameterModes[1], state);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '06':
            case '6':
                if (param(state[programState.nextPosition + 1], parameterModes[0], state) === 0) {
                    programState.nextPosition = param(state[programState.nextPosition + 2], parameterModes[1], state);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '07':
            case '7':
                if (param(state[programState.nextPosition + 1], parameterModes[0], state) < param(state[programState.nextPosition + 2], parameterModes[1], state)) {
                    updateState(state[programState.nextPosition + 3], 1, state);
                } else {
                    updateState(state[programState.nextPosition + 3], 0, state);
                }
                commandLength = 4;
                break;
            case '08':
            case '8':
                if (param(state[programState.nextPosition + 1], parameterModes[0], state) === param(state[programState.nextPosition + 2], parameterModes[1], state)) {
                    updateState(state[programState.nextPosition + 3], 1, state);
                } else {
                    updateState(state[programState.nextPosition + 3], 0, state);
                }
                commandLength = 4;
                break;
            case '99':
                return {
                    ...programState,
                    output: outputs,
                    remainingInputs: programState.remainingInputs.slice(nextInputIndex),
                    exit: true
                };
            default:
                console.error(`unexpected state at i=${programState.nextPosition}:`, state);
                return null;
        }
        // console.log(`new state   (${state.length}): ` + state.join(', '));
        programState.nextPosition = programState.nextPosition + commandLength;
    }
}

interface ProgramState {
    state: number[],
    output: number[],
    nextPosition: number,
    remainingInputs: number[],
    exit: boolean

}

function permute(inputArray) {
    if (inputArray.length === 1) return inputArray;
    return inputArray.reduce(function (accumulator, _, index) {
        permute([...inputArray.slice(0, index), ...inputArray.slice(index + 1)])
            .map(value => accumulator.push([].concat(inputArray[index], value)));
        return accumulator;
    }, []);
}


function computeMaxThruster(program: number[]) {
    let max = 0;
    for (const phaseSettings of permute([9, 8, 7, 6, 5])) {
        const programs: ProgramState[] = [
            {
                state: [...program],
                remainingInputs: [phaseSettings[0], 0],
                nextPosition: 0,
                exit: false,
                output: []
            }, {
                state: [...program],
                remainingInputs: [phaseSettings[1]],
                nextPosition: 0,
                exit: false,
                output: []
            }, {
                state: [...program],
                remainingInputs: [phaseSettings[2]],
                nextPosition: 0,
                exit: false,
                output: []
            }, {
                state: [...program],
                remainingInputs: [phaseSettings[3]],
                nextPosition: 0,
                exit: false,
                output: []
            }, {
                state: [...program],
                remainingInputs: [phaseSettings[4]],
                nextPosition: 0,
                exit: false,
                output: []
            }];
        do {
            for (const i of [0, 1, 2, 3, 4]) {
                console.debug('prev: ', (i - 1 + 5) % 5);
                programs[i] = run({
                    ...programs[i],
                    remainingInputs: [...programs[i].remainingInputs, ...programs[(i - 1 + 5) % 5].output]
                });
                console.debug('result: ', programs[i]);
            }
        } while (!programs[programs.length - 1].exit);

        console.debug('final output: ', programs[programs.length - 1].output);
        max = Math.max(max, programs[programs.length - 1].output[programs[programs.length - 1].output.length - 1]);
    }
    return max;
}


console.log('result: ', computeMaxThruster([3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 42, 55, 76, 89, 114, 195, 276, 357, 438, 99999, 3, 9, 1001, 9, 3, 9, 1002, 9, 3, 9, 1001, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 101, 5, 9, 9, 4, 9, 99, 3, 9, 102, 3, 9, 9, 101, 5, 9, 9, 1002, 9, 2, 9, 101, 4, 9, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 1001, 9, 3, 9, 4, 9, 99, 3, 9, 1001, 9, 4, 9, 102, 5, 9, 9, 1001, 9, 5, 9, 1002, 9, 2, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99]));

