import { numToSplitBetween, handleNumSplit, clearAllValues } from '../src/index';

describe('testing handleNumSplit()', () => {
    it('should change to invalid and clear values if NaN', () => {

        const fakeElem = document.createElement('input');
        fakeElem.value = 'stuff';
        handleNumSplit(fakeElem);
        expect(fakeElem.classList.add).toHaveBeenCalledWith('invalid-input');
        expect(fakeElem.blur).toHaveBeenCalled();
        expect(clearAllValues).toHaveBeenCalled();
    });

});
