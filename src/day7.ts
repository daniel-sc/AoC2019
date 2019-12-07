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


function run(inputs: number[], state: number[]): number[] {
    const outputs = [];
    let nextInputIndex = 0;
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
                updateState(state[i + 3], param(state[i + 1], parameterModes[0], state) + param(state[i + 2], parameterModes[1], state), state);
                break;
            case '02':
            case '2':
                updateState(state[i + 3], param(state[i + 1], parameterModes[0], state) * param(state[i + 2], parameterModes[1], state), state);
                break;
            case '03':
            case '3':
                updateState(state[i + 1], inputs[nextInputIndex], state);
                nextInputIndex++;
                commandLength = 2;
                break;
            case '04':
            case '4':
                outputs.push(param(state[i + 1], parameterModes[0], state));
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
                    updateState(state[i + 3], 1, state);
                } else {
                    updateState(state[i + 3], 0, state);
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
    return outputs;
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
    for (const phaseSettings of permute([4, 3, 2, 1, 0])) {

        let lastOutput = 0;
        for (const i of [0, 1, 2, 3, 4]) {
            const result = run([phaseSettings[i], lastOutput], [...program]);
            console.debug('result: ', result);
            lastOutput = result[0];
        }
        max = Math.max(max, lastOutput);
    }
    return max;
}

console.log('perm: ', permute([1, 2, 3]));

console.log('result: ', computeMaxThruster([3,8,1001,8,10,8,105,1,0,0,21,42,55,76,89,114,195,276,357,438,99999,3,9,1001,9,3,9,1002,9,3,9,1001,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,101,5,9,9,4,9,99,3,9,102,3,9,9,101,5,9,9,1002,9,2,9,101,4,9,9,4,9,99,3,9,102,5,9,9,1001,9,3,9,4,9,99,3,9,1001,9,4,9,102,5,9,9,1001,9,5,9,1002,9,2,9,101,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99]));

