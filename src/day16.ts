import {lcm} from './point';


const input16 = '59709275180991144553584971145772909665510077889137728108418335914621187722143499835763391833539113913245874471724316543318206687063884235599476032241946131415288903315838365933464260961288979081653450180693829228376307468452214424448363604272171578101049695177870848804768766855959460302410160410252817677019061157656381257631671141130695064999297225192441065878259341014746742840736304437968599872885714729499069286593698777113907879332554209736653679474028316464493192062972874319626623316763537266681767610340623614648701699868901159785995894014509520642548386447251984766543776759949169049134947575625384064448900019906754502662096668908517457172';

// const input16 = '03036732577212944063491565474664';
// const input16 = '80871224585914546619083218645595';
// const input16 = '12345678';

const basePattern = [0, 1, 0, -1];

const REP = 10000;
// const REP = 10000;
const LENGTH = input16.length * REP;
const inputNumbers = input16.split('').map(x => parseInt(x));

const messageOffset = parseInt(input16.substr(0, 7));

// console.debug = () => null;

function getPatternByIndex(digit: number, index: number) {
    return basePattern[(Math.floor((index + 1) / (digit + 1))) % basePattern.length]
}

function getPatternByIndex2(digit: number, index: number) {
    return {
        value: basePattern[(Math.floor((index + 1) / (digit + 1))) % basePattern.length],
        len: digit - ((index + 1) % (digit + 1))
    }
}

const digitCache = new Map<string, number>();


function basisRepeatSum(repeatAfterIndexMax: number, digit: number, phase: number) {
    let repeatSum = 0;
    for (let i = 0; i < repeatAfterIndexMax; i++) {
        const p = getPatternByIndex2(digit, i);
        const max = Math.min(repeatAfterIndexMax, i + p.len);
        if (p.value !== 0) {
            let innerSum = 0;
            for (let i2 = i; i2 < max; i2++) {
                innerSum += getDigit(i2, phase - 1);
            }
            repeatSum += p.value * innerSum;
        }
        i = max;
    }
    return repeatSum;
}

function computeAdditionalSum(repeatCount: number, repeatAfterIndexMax: number, digit: number, phase: number) {
    let additionalSum = 0;
    for (let i = repeatCount * repeatAfterIndexMax; i < LENGTH; i++) {
        const equivalentIndex = i % repeatAfterIndexMax;
        const p = getPatternByIndex(digit, equivalentIndex);
        if (p !== 0) {
            additionalSum += p * getDigit(equivalentIndex, phase - 1);
        }
    }
    return additionalSum;
}

function computeSum(digit: number, phase: number) {
    // console.log('computing: ', key);
    const repeatAfterIndex = lcm((digit + 1) * basePattern.length, input16.length);
    const repeatAfterIndexMax = Math.min(repeatAfterIndex, LENGTH);
    if (digit % 1000 === 0) {
        console.log(`computing (phase=${phase}, digit=${digit}, repeatAfterIndex=${repeatAfterIndex}): `, repeatAfterIndexMax);
    }
    const repeatSum = basisRepeatSum(repeatAfterIndexMax, digit, phase);
    const repeatCount = Math.floor(LENGTH / repeatAfterIndexMax);
    const additionalSum = computeAdditionalSum(repeatCount, repeatAfterIndexMax, digit, phase);
    return (repeatCount * repeatSum) + additionalSum;
}

function getDigit(digit: number, phase: number) {
    if (phase === 0) {
        return inputNumbers[digit % inputNumbers.length];
    } else {
        const key = `${digit}_${phase}`;
        if (!digitCache.has(key)) {
            const sum = computeSum(digit, phase);
            digitCache.set(key, Math.abs(sum) % 10);
        }
        return digitCache.get(key);
    }
}

// console.log('first digit: ', getDigit(0, 0));
/*console.log('digit1: ', getDigit(0, 100));
console.log('digit2: ', getDigit(1, 100));
console.log('digit3: ', getDigit(2, 100));
console.log('digit3: ', getDigit(3, 100));*/

console.log('offset: ', messageOffset);
console.log('digit1: ', getDigit(messageOffset, 100));
console.log('digit2: ', getDigit(messageOffset + 1, 100));
console.log('digit3: ', getDigit(messageOffset + 2, 100));
console.log('digit4: ', getDigit(messageOffset + 3, 100));
console.log('digit5: ', getDigit(messageOffset + 4, 100));
console.log('digit6: ', getDigit(messageOffset + 5, 100));
console.log('digit7: ', getDigit(messageOffset + 6, 100));
console.log('digit8: ', getDigit(messageOffset + 7, 100));
/*console.log('digit2: ', getDigit(messageOffset + 2, 100));
console.log('digit3: ', getDigit(messageOffset + 3, 100));*/
