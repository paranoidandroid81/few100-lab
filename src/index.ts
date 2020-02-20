
import './styles.css';

const billInput = document.querySelector('#input-amt') as HTMLInputElement;
const allTipButtons = document.querySelectorAll('.button-group') as NodeListOf<HTMLButtonElement>;
const customTip = document.querySelector('#custom-tip-input') as HTMLInputElement;
export const numToSplitBetween = document.querySelector('#num-people') as HTMLInputElement;
console.log(document);
console.log(numToSplitBetween);
const billAmtOutput = document.querySelector('#bill-amt') as HTMLSpanElement;
const tipPctOutput = document.querySelector('#tip-pct') as HTMLSpanElement;
const tipAmtOutput = document.querySelector('#tip-amt') as HTMLSpanElement;
const billTotalOutput = document.querySelector('#bill-total') as HTMLSpanElement;
const totalperPerson = document.querySelector('#bill-per-person') as HTMLSpanElement;

const storedTip = parseInt(localStorage.getItem('pref_tip_amt'), 10);
let currTipPct = isNaN(storedTip) ? 20 : storedTip;
let currCustomTip: number = null;
resetTipToStoredVal(currTipPct);

let currBillAmt = 0.00;
let numPeople = 1; // default

allTipButtons.forEach(btn => {
    btn.addEventListener('click', handleBtnClick);
});

if (customTip) {
    customTip.addEventListener('input', handleCustomTip);
}

if (numToSplitBetween) {
    numToSplitBetween.addEventListener('input', () => handleNumSplit(numToSplitBetween));
}

if (billInput) {
    billInput.addEventListener('keyup', handleBillInputChange);
}

export function handleNumSplit(numToSplitLocal: HTMLInputElement) {
    console.log(numToSplitLocal);
    const currInput = numToSplitLocal.value;
    const inputAsNum = Number(currInput);
    if (!inputAsNum || inputAsNum < 1) {
        console.log('bad input!');
        numToSplitLocal.classList.add('invalid-input');
        numToSplitLocal.blur();
        clearAllValues();
    } else {
        numToSplitLocal.classList.remove('invalid-input');
        numPeople = inputAsNum;
        updateCalculatedValues();
    }
}

function handleCustomTip() {
    const currInput = customTip.value;
    const inputAsNum = Number(currInput);
    allTipButtons.forEach(btn => btn.disabled = false);
    if (!inputAsNum || inputAsNum < 0) {
        console.log('bad input!!!');
        // not a valid number!!!
        customTip.classList.add('invalid-input');
        customTip.blur();
        clearAllValues();
    } else {
        customTip.classList.remove('invalid-input');
        currCustomTip = inputAsNum;
        updateCalculatedValues();
    }
}

function handleBillInputChange() {
    const currInput = billInput.value;
    console.log(currInput);
    const inputAsNum = Number(currInput);

    if (!inputAsNum || inputAsNum < 0) {
        console.log('bad input!!!');
        // not a valid number!!!
        billInput.classList.add('invalid-input');
        billInput.blur();
        clearAllValues();
    } else {
        billInput.classList.remove('invalid-input');
        currBillAmt = inputAsNum;
        updateCalculatedValues();
    }


}

export function clearAllValues() {
    const currBill = currBillAmt;
    numPeople = 1;
    billAmtOutput.innerText = currBill.toFixed(2);
    tipPctOutput.innerText = currTipPct.toString();
    tipAmtOutput.innerText = '0.00';
    billTotalOutput.innerText = currBill.toFixed(2);
    totalperPerson.innerText = (currBill / numPeople).toFixed(2);
    resetTipToStoredVal(currTipPct);

}

function resetTipToStoredVal(currTip: number) {
    allTipButtons.forEach(btn => {
        if (btn.innerText === `${currTip}%`) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
}

function updateCalculatedValues() {
    billAmtOutput.innerText = currBillAmt.toFixed(2);
    let calcTipAmount;
    if (currCustomTip) {
        calcTipAmount = currCustomTip;
        tipPctOutput.innerText = 'N/A';
    } else {
        tipPctOutput.innerText = currTipPct.toString();
        calcTipAmount = (currBillAmt * (currTipPct / 100));
    }

    tipAmtOutput.innerText = calcTipAmount.toFixed(2);
    const totalWithTip = (currBillAmt + calcTipAmount);
    billTotalOutput.innerText = totalWithTip.toFixed(2);
    totalperPerson.innerText = (totalWithTip / numPeople).toFixed(2);
}

function handleBtnClick() {
    const that = this as HTMLButtonElement;

    allTipButtons.forEach(btn => {
        if (btn === that) {
            btn.disabled = true;
        } else {
            btn.disabled = false;
        }
    });
    customTip.classList.remove('invalid-input');
    currCustomTip = null;
    currTipPct = Number(that.innerText.slice(0, -1));
    localStorage.setItem('pref_tip_amt', currTipPct.toString());
    console.log(currTipPct);
    updateCalculatedValues();
}
