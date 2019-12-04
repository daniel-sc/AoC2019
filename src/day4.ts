const min = '359282';
const max = '820401';

function getNextNonDec(start: string) {
    let next = '' + (parseInt(start) + 1);
    for (let i = 1; i < next.length; i++) {
        if (next[i] < next[i - 1]) {
            return next.substr(0, i) + next[i - 1].repeat(next.length - i);
        }
    }
    return next;
}

function getNextNonDecWithDoubleDigit(start: string) {
    let curr = start;
    do {
        curr = getNextNonDec(curr);
    } while (!/(\d)\1/.test(curr));
    return curr;
}

function getNextNonDecWithExactDoubleDigit(start: string) {
    let curr = start;
    do {
        curr = getNextNonDecWithDoubleDigit(curr);
    } while (!/(\d)\1/.test(curr.replace(/(\d)\1{2,}/g, '')));
    return curr;
}

function getCountForRange(min: string, max: string, nextFn: (string) => string) {
    let count = 0;
    let curr = min;
    while (curr < max) {
        curr = nextFn(curr);
        // console.debug('curr: ', curr);
        count++;
    }
    // console.debug('last: ', curr);
    return count - 1;
}

console.log('count1: ', getCountForRange(min, max, getNextNonDecWithDoubleDigit));
console.log('count2: ', getCountForRange(min, max, getNextNonDecWithExactDoubleDigit));
