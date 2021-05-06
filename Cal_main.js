'use strict';
const progress = document.querySelector('.cal__process');
const result = document.querySelector('.cal__result');
const PLUS = '+'
const SUB = '-'
const MULTI = '*'
const DIV = '/'   
const PERCENT = '%'
const operators = /[+*/%-]/;
let progressArr = new Array();
let numArr = new Array();

const toString = function (array) {
    return array.join('');
}

class Screen {
    constructor (progress, result) {
        this.progress = progress;
        this.result = result;
    }

    proValue () {
        return this.progress.textContent;
    }

    resValue () {
        return this.result.textContent;
    }

    valueChange (value, screen = 'result') {
        if ( screen === 'progress' )
            this.progress.textContent = value;
        else
            this.result.textContent = value;
    }

    screen_clear (chk) {
        switch (chk) {
            case 1:
                this.result.textContent = '';
                break;
            case 2:
                this.progress.textContent = '';
                break;
            default:
                this.progress.textContent = '';
                this.result.textContent = '';
                break;
        }
    }

    screenChk () {
        if (this.progress.textContent.match(operators) && !progress.textContent.match('=')){
            return this.screen_clear(1);
        } else if (this.progress.textContent.match('=')) {
            return this.screen_clear(); 
        } else if ( this.progress.textContent == 0 && result.textContent == 0)
            return cal__clear();
    }
}

let screen = new Screen(progress, result);

const checkProgress = function () {
    if ( progressArr == "" ) {
        return 'none';
    }
    else if ( progressArr[progressArr.length-1] == '=' )
        return 'equal';
    else if ( Boolean(progressArr[progressArr.length-1].match(operators)) )
        return 'opt';
    else if ( Boolean(progressArr[progressArr.length-2]) )
        if (progressArr[progressArr.length-2].match(operators))
                return 'progress';
    else if ( Boolean(Number(progressArr[progressArr.length-1])) )
        return 'number';    
}

function cal__clear() {
    screen.screen_clear(0);
    numArr = [];
    progressArr = [];
}

function cal__backspace() {
    if ( numArr == '' ){
        if ( checkProgress() === 'opt' )
            return;
        else if ( checkProgress() === 'equal' && screen.resValue() != ""){
            screen.screen_clear(2);
            numArr.push(screen.resValue());
        }
    } else if ( numArr !='') {
        if ( screen.proValue() == "" ) return -1;
        numArr.pop();
    }
    screen.valueChange(toString(numArr));
}

// 처음에 들어온 값 * 두번째들어온 값 / 100
// 계산만 해서 던지는 놈
function cal__percent() {
    // percent 계산만 하는 함수
    function percent__operator(val1, val2) {
        return String((val1)*val2/100);
    };

    numArr = [];

    if ( checkProgress() === 'opt' ){
        let value = percent__operator(progressArr[0],screen.resValue());
        input__number(value);
        screen.progress.textContent = toString(progressArr) + value; 
    } else if ( checkProgress() === 'equal' ) {
        let value = percent__operator(eval(toString(progressArr.filter(test => test != '='))),screen.resValue());
        screen.valueChange(value,'progress')
        screen.valueChange(value)
    }

    console.log(`progressArr: ${progressArr} & numArr: ${numArr}`);

}

function input__number(num) {
    screen.screenChk();
    numArr.push(num);
    screen.valueChange(toString(numArr));
}

let numToProgress = function () {
    if ( toString(numArr) === "" ) return -1;
    progressArr.push(toString(numArr));
    numArr = [];
}
function input__operator(opt) {
    numToProgress();
    switch (checkProgress()) {
        case 'equal':
            progressArr = [screen.resValue(), opt];
            break;
        case 'opt':
            progressArr[progressArr.length-1] = opt;
            break;
        case 'progress':
            progressArr = [eval(toString(progressArr)),opt];
            break;
        case 'number':
            if ( toString(progressArr).match('=') ){
                progressArr = [screen.resValue(), opt];
            }
            break;
        default:
            progressArr.push(opt);       
    }    
    screen.valueChange(toString(progressArr),'progress');
}

function cal__eqaul(equal) {
    try {
        if ( numArr != '' && checkProgress() !== 'equal' ) {
            progressArr.push(screen.resValue());
            screen.result.textContent = eval(toString(progressArr));
        } else if ( checkProgress() === 'equal') {
            if ( numArr == [] ) {
                progressArr[0] = eval(toString(progressArr));
            } else {
                progressArr[0] = screen.resValue();
            }
            progressArr.pop();
            screen.result.textContent = eval(toString(progressArr));
        } else if ( checkProgress() === 'opt' ) {
            progressArr.push(screen.resValue());
            screen.result.textContent = progressArr[0];
        }
        progressArr.push(equal);
        screen.progress.textContent = toString(progressArr);
        numArr = [];
    } catch {
        return -1;
    }
    
}

window.addEventListener('keydown', (value) => {
    let val = value;

    if (  !isNaN(Number(val.key)) || val.key == '.' )
        input__number(val.key)
    else if ( val.key == PLUS ) input__operator(PLUS)
    else if ( val.key == SUB ) input__operator(SUB)
    else if ( val.key == MULTI ) input__operator(MULTI)
    else if ( val.key == DIV ) input__operator(DIV)
    else if ( val.key == PERCENT ) cal__percent()
    else if ( val.key == 'Enter' ) cal__eqaul('=')
    else if ( val.key == 'Backspace') cal__backspace()
    else if ( val.key == 'Escape') cal__clear();
});