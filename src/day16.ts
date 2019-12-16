import {lcm} from './point';


// const input16 = '59709275180991144553584971145772909665510077889137728108418335914621187722143499835763391833539113913245874471724316543318206687063884235599476032241946131415288903315838365933464260961288979081653450180693829228376307468452214424448363604272171578101049695177870848804768766855959460302410160410252817677019061157656381257631671141130695064999297225192441065878259341014746742840736304437968599872885714729499069286593698777113907879332554209736653679474028316464493192062972874319626623316763537266681767610340623614648701699868901159785995894014509520642548386447251984766543776759949169049134947575625384064448900019906754502662096668908517457172';

const input16 = '03036732577212944063491565474664';
// const input16 = '80871224585914546619083218645595';
// const input16 = '12345678';

const basePattern = [0, 1, 0, -1];
const basePattern0 = [1, 0, -1, 0];

// const REP = 1;
const REP = 10000;
const LENGTH = input16.length * REP;
const inputNumbers = input16.split('').map(x => parseInt(x));

const messageOffset = parseInt(input16.substr(0, 7));

// console.debug = () => null;

/*function getPattern(digit: number, inputLength: number) {
    const pattern = basePattern.reduce((acc, curr) => ([...acc, ...Array.from({length: digit + 1}).map(() => curr)]), []);
    console.debug('pattern: ', pattern.join(','));
    let p = [...pattern];
    p.shift();
    while (p.length < inputLength) {
        p = [...p, ...pattern];
    }
    return p;
}*/

function getPatternByIndex(digit: number, index: number) {
    // const pattern = digit === 0 ? basePattern0 : basePattern;
    // return basePattern[(index / (digit + 1) -1 % basePattern.length * (digit + 1)) / (digit + 1)]
    // return basePattern[((index / (digit + 1)) + 1) % basePattern.length]
    return basePattern[(Math.floor((index + 1) / (digit + 1))) % basePattern.length]
}

/*// const patterns = Array.from({length: input16.length * 10000}).map((v, i) => getPattern(i, input16.length * 10000));
getPattern(50, input16.length * REP);
console.log('compiled patterns.');*/

/*function performPhase(input: number[]): number[] {
    return input.map((unused, i) => {
        let p = getPattern(i, input.length);
        //console.debug('pattern2: ', p.join(','));
        return Math.abs(input.map((value, index) => value * p[index]).reduce((acc, curr) => acc + curr, 0)) % 10;
    });
}*/

//console.log('input numbers: ', inputNumbers);
//console.log('phase1: ', performPhase(inputNumbers));

/*let r = inputNumbers;
for (let i = 0; i < 100; i++) {
    r = performPhase(r);
}*/
//console.log('after 100 phases: ', r.join(''));

/*
const message = r.slice(messageOffset, messageOffset + 8);
console.log('message: ', message.join(''));
*/

const digitCache = new Map<string, number>();


function getDigit(digit: number, phase: number) {
    if (phase === 0) {
        return inputNumbers[digit % inputNumbers.length];
    } else {
        let key = `${digit}_${phase}`;
        if (!digitCache.has(key)) {
            // console.log('computing: ', key);
            const repeatAfterIndex = lcm((digit + 1) * basePattern.length, input16.length);
            const repeatAfterIndexMax = Math.min(repeatAfterIndex, LENGTH);
            if (digit % 1000 === 0) {
                console.log(`computing (digit=${digit}, repeatAfterIndex=${repeatAfterIndex}): `, key, Math.min(repeatAfterIndex, LENGTH));
            }
            if (LENGTH % repeatAfterIndexMax !== 0) {
                console.warn('lenght mismatch');
            }
            // console.debug('repeatAfterIndex: ', repeatAfterIndex);
            let repeatSum = 0;
            for (let i = 0; i < repeatAfterIndexMax; i++) {
                const p = getPatternByIndex(digit, i);
                if (p !== 0) {
                    repeatSum += p * getDigit(i, phase - 1);
                }
            }
            /*            const repeat = Array.from({length: repeatAfterIndexMax}).map((v, i) => {
                            const p = getPatternByIndex(digit, i);
                            // console.debug(`p (i=${i}, digit=${digit}): `, p);
                            return p !== 0 ? p * getDigit(i, phase - 1) : 0;
                        });
                        const repeatSum = repeat.reduce((a, b) => a + b, 0);*/
            // console.debug(`repeat (sum=${repeatSum}): `, repeat);
            const sum = (LENGTH / repeatAfterIndexMax) * repeatSum;
            /* let sum = 0;
             for (let i = 0; i < LENGTH; i += repeatAfterIndexMax) {
                 if (i + repeatAfterIndexMax <= LENGTH) {
                     //console.debug('adding repeat sum: ', repeatSum);
                     sum += repeatSum;
                 } else {
                     console.warn('NOOOO');
                     for (let index = i; index < LENGTH; index++) {
                         //console.debug(`adding repeat (i=${i}): `, repeat[index % repeatAfterIndex]);
                         sum += repeat[index % repeatAfterIndex];
                     }
                 }
             }*/
            digitCache.set(key, Math.abs(sum) % 10);
        }
        return digitCache.get(key);
    }
}

// console.log('first digit: ', getDigit(0, 0));
/*
console.log('digit1: ', getDigit(0, 100));
console.log('digit2: ', getDigit(1, 100));
console.log('digit3: ', getDigit(2, 100));
*/

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
