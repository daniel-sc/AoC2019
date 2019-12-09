function param(paramValue: number, paramMode: string, programState: ProgramState): number {
    switch (paramMode) {
        case '0':
        case undefined:
        case '':
            console.debug(`using position mode (v=${paramValue}) : `, programState.state[paramValue]);
            if (paramValue < 0) {
                console.log('ERROR: access of negative position: ', paramValue);
            }
            return programState.state[paramValue] || 0;
        case '1':
            console.debug(`using immediate mode (v=${paramValue}): `, paramValue);
            return paramValue;
        case '2':
            console.debug(`using relative  mode (v=${paramValue}): `, programState.state[programState.relativeBase + paramValue]);
            if (programState.relativeBase + paramValue < 0) {
                console.log('ERROR: access of negative relative position: ', paramValue);
            }
            return programState.state[programState.relativeBase + paramValue] || 0;
        default:
            console.warn('unexpected paramMode: ', paramMode);
    }
}

function updateState(pos: number, value: number, state: number[]) {
    console.debug(`update pos ${pos} : ${state[pos]} -> ${value}`);
    state[pos] = value;
}


export function run(programState: ProgramState): ProgramState {
    const outputs = [];
    let nextInputIndex = 0;
    const state = programState.state;

    while (true) {
        const l = `${state[programState.nextPosition]}`.length;
        const opcode = l >= 2 ? `${state[programState.nextPosition]}`.substr(l - 2) : `${state[programState.nextPosition]}`;
        const parameterModes = l >= 2 ? `${state[programState.nextPosition]}`.substr(0, l - 2).split('').reverse() : [];
        console.debug(`command=${state[programState.nextPosition]}, opcode=${opcode}, parameterModes: `, parameterModes);
        let commandLength = 4; // default
        switch (opcode) {
            case '01':
            case '1':
                // updateState(state[programState.nextPosition + 3], param(state[programState.nextPosition + 1], parameterModes[0], programState) + param(state[programState.nextPosition + 2], parameterModes[1], programState), state);
                updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), param(state[programState.nextPosition + 1], parameterModes[0], programState) + param(state[programState.nextPosition + 2], parameterModes[1], programState), state);
                break;
            case '02':
            case '2':
                // updateState(state[programState.nextPosition + 3], param(state[programState.nextPosition + 1], parameterModes[0], programState) * param(state[programState.nextPosition + 2], parameterModes[1], programState), state);
                updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), param(state[programState.nextPosition + 1], parameterModes[0], programState) * param(state[programState.nextPosition + 2], parameterModes[1], programState), state);
                break;
            case '03':
            case '3':
                if (nextInputIndex < programState.remainingInputs.length) {
                    console.log(`command=${state[programState.nextPosition]}, opcode=${opcode}, relBase=${programState.relativeBase} parameterModes: `, parameterModes);
                    // updateState(state[programState.nextPosition + 1], programState.remainingInputs[nextInputIndex], state);
                    // updateState(state[programState.nextPosition + 1], param(programState.remainingInputs[nextInputIndex], parameterModes[0], programState), state);
                    updateState(param(state[programState.nextPosition + 1], parameterModes[0], programState), programState.remainingInputs[nextInputIndex], state);
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
                outputs.push(param(state[programState.nextPosition + 1], parameterModes[0], programState));
                console.log('updated outputs: ', outputs);
                commandLength = 2;
                break;
            case '05':
            case '5':
                if (param(state[programState.nextPosition + 1], parameterModes[0], programState) !== 0) {
                    programState.nextPosition = param(state[programState.nextPosition + 2], parameterModes[1], programState);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '06':
            case '6':
                if (param(state[programState.nextPosition + 1], parameterModes[0], programState) === 0) {
                    programState.nextPosition = param(state[programState.nextPosition + 2], parameterModes[1], programState);
                    commandLength = 0;
                } else {
                    commandLength = 3;
                }
                break;
            case '07':
            case '7':
                if (param(state[programState.nextPosition + 1], parameterModes[0], programState) < param(state[programState.nextPosition + 2], parameterModes[1], programState)) {
                    // updateState(state[programState.nextPosition + 3], 1, state);
                    updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), 1, state);
                } else {
                    // updateState(state[programState.nextPosition + 3], 0, state);
                    updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), 0, state);
                }
                commandLength = 4;
                break;
            case '08':
            case '8':
                if (param(state[programState.nextPosition + 1], parameterModes[0], programState) === param(state[programState.nextPosition + 2], parameterModes[1], programState)) {
                    // updateState(state[programState.nextPosition + 3], 1, state);
                    updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), 1, state);
                } else {
                    // updateState(state[programState.nextPosition + 3], 0, state);
                    updateState(param(state[programState.nextPosition + 3], parameterModes[2], programState), 0, state);
                }
                commandLength = 4;
                break;
            case '09':
            case '9':
                programState.relativeBase = programState.relativeBase + param(state[programState.nextPosition + 1], parameterModes[0], programState);
                // programState.relativeBase = programState.relativeBase + state[programState.nextPosition + 1];
                console.debug('updated relativeBase to: ', programState.relativeBase);
                commandLength = 2;
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

export interface ProgramState {
    state: number[],
    output: number[],
    nextPosition: number,
    relativeBase: number,
    remainingInputs: number[],
    exit: boolean

}
