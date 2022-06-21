/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-time-mask.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Renderer2, Self, EventEmitter, Output, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
/** @type {?} */
const MAC_ENTER = 3;
/** @type {?} */
const BACKSPACE = 8;
/** @type {?} */
const TAB = 9;
/** @type {?} */
const LEFT_ARROW = 37;
/** @type {?} */
const UP_ARROW = 38;
/** @type {?} */
const RIGHT_ARROW = 39;
/** @type {?} */
const DOWN_ARROW = 40;
/** @type {?} */
const DELETE = 46;
/** @type {?} */
const ZERO = 48;
/** @type {?} */
const NINE = 57;
/** @type {?} */
const NUMPAD_ZERO = 96;
/** @type {?} */
const NUMPAD_NINE = 105;
export class NgxTimeMaskDirective {
    /**
     * @param {?} element
     * @param {?} renderer
     * @param {?} ngModel
     */
    constructor(element, renderer, ngModel) {
        this.element = element;
        this.renderer = renderer;
        this.ngModel = ngModel;
        // tslint:disable-next-line: no-output-native
        this.change = new EventEmitter();
        this.minHour = 1;
        this.maxHour = 12;
        this.fieldJustGotFocus = false;
    }
    /**
     * Listener on Keydown
     * @param {?} evt
     * @return {?}
     */
    onKeyDown(evt) {
        /** @type {?} */
        const keyCode = evt.keyCode;
        switch (keyCode) {
            case LEFT_ARROW:
            case RIGHT_ARROW:
            case TAB:
                this._checkAndJumpCursor(keyCode, evt);
                break;
            case DELETE:
            case BACKSPACE:
                evt.preventDefault();
                break;
            case DOWN_ARROW:
                this._setInputText(null, -1);
                break;
            case UP_ARROW:
                this._setInputText(null, 1);
                break;
            default:
                if ((keyCode >= ZERO && keyCode <= NINE) || (keyCode >= NUMPAD_ZERO && keyCode <= NUMPAD_NINE)) {
                    this._setInputText(evt.key, 0);
                }
        }
        if (keyCode !== TAB) {
            evt.preventDefault();
        }
    }
    /**
     * Listener on click
     * @return {?}
     */
    onClick() {
        this.fieldJustGotFocus = true;
        /** @type {?} */
        const caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            this.element.nativeElement.setSelectionRange(0, 2);
        }
        else {
            this.element.nativeElement.setSelectionRange(3, 6);
        }
    }
    /**
     * Listener on focus
     * @return {?}
     */
    onFocus() {
        this.fieldJustGotFocus = true;
        /** @type {?} */
        const caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            this.element.nativeElement.setSelectionRange(0, 2);
        }
        else {
            this.element.nativeElement.setSelectionRange(3, 6);
        }
    }
    /**
     * Listener on blur
     * @return {?}
     */
    onBlur() {
        this._validateField();
    }
    /**
     * @private
     * @return {?}
     */
    _validateField() {
        /** @type {?} */
        const selectedTime = this.element.nativeElement.value.split(':');
        if (selectedTime[0] === '00') {
            /** @type {?} */
            const completeTime = `01:${selectedTime[1]}`;
            this.renderer.setProperty(this.element.nativeElement, 'value', completeTime);
            this.inputDataChanged();
        }
    }
    /**
     * @private
     * @param {?} keyCode
     * @param {?=} evt
     * @return {?}
     */
    _checkAndJumpCursor(keyCode, evt) {
        /** @type {?} */
        const caretPosition = this._getCursorPosition();
        switch (keyCode) {
            case RIGHT_ARROW:
                this.element.nativeElement.setSelectionRange(3, 6);
                break;
            case LEFT_ARROW:
                this.element.nativeElement.setSelectionRange(0, 2);
                break;
            case TAB:
                if (caretPosition < 2 && !evt.shiftKey) {
                    this.element.nativeElement.setSelectionRange(3, 6);
                    evt.preventDefault();
                }
                else if (caretPosition > 2 && evt.shiftKey) {
                    this.element.nativeElement.setSelectionRange(0, 2);
                    evt.preventDefault();
                }
        }
        this.fieldJustGotFocus = true;
        this._validateField();
    }
    /**
     * @private
     * @param {?} key
     * @param {?} valueToAppend
     * @return {?}
     */
    _setInputText(key, valueToAppend) {
        /** @type {?} */
        const input = this.element.nativeElement.value.split(':');
        /** @type {?} */
        let hours = input[0];
        /** @type {?} */
        let minutes = input[1];
        /** @type {?} */
        const caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            hours = this.getHoursInStringAfterAppend(+hours, valueToAppend, this.maxHour);
            this._setHours(hours, minutes, key);
        }
        else {
            minutes = this.getHoursInStringAfterAppend(+minutes, valueToAppend, 60);
            this._setMinutes(hours, minutes, key);
        }
    }
    /**
     * @param {?} hours
     * @param {?} valueToAppend
     * @param {?} limitToReset
     * @return {?}
     */
    getHoursInStringAfterAppend(hours, valueToAppend, limitToReset) {
        // Hours should be b/w  01 - 12 or 00 - 23 and Minutes should be 0-59
        if (limitToReset === this.maxHour) {
            if (hours <= limitToReset) {
                /** @type {?} */
                let valueAfterAppend = hours + valueToAppend;
                if (valueAfterAppend < 0) {
                    valueAfterAppend = this.maxHour;
                }
                else if (valueAfterAppend > limitToReset) {
                    valueAfterAppend = this.maxHour === 12 ? 1 : 0;
                }
                return valueAfterAppend < 10 ? `0${valueAfterAppend}` : `${valueAfterAppend}`;
            }
        }
        else {
            if (hours <= limitToReset) {
                /** @type {?} */
                let valueAfterAppend = hours + valueToAppend;
                if (valueAfterAppend < 0) {
                    valueAfterAppend = 59;
                }
                else if (valueAfterAppend > limitToReset) {
                    valueAfterAppend = 0;
                }
                return valueAfterAppend < 10 ? `0${valueAfterAppend}` : `${valueAfterAppend}`;
            }
        }
        return this.minHour.toString();
    }
    /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    _setHours(hours, minutes, key) {
        /** @type {?} */
        const hoursArray = hours.split('');
        /** @type {?} */
        const firstDigit = hoursArray[0];
        /** @type {?} */
        const secondDigit = hoursArray[1];
        /** @type {?} */
        let newHour = '';
        /** @type {?} */
        let completeTime = '';
        /** @type {?} */
        let sendCursorToMinutes = false;
        if (key !== null) {
            if (firstDigit === '-' || this.fieldJustGotFocus) {
                newHour = `0${key}`;
                sendCursorToMinutes = Number(key) > (this.maxHour > 20 ? 2 : 1);
                this.fieldJustGotFocus = false;
            }
            else {
                newHour = `${secondDigit}${+key === 0 && +secondDigit === 0 ? this.minHour.toString() : key}`;
                if (Number(newHour) > this.maxHour) {
                    newHour = this.maxHour.toString();
                }
                if (Number(newHour) === 0) {
                    newHour = this.minHour.toString();
                }
                sendCursorToMinutes = true;
            }
        }
        else {
            newHour = `${hours}`;
            if (Number(newHour) > this.maxHour) {
                newHour = this.maxHour.toString();
            }
            if (Number(newHour) === 0 && this.maxHour === 23) {
                newHour = `0${this.minHour.toString()}`;
            }
            else if (Number(newHour) === 0) {
                newHour = this.maxHour.toString();
            }
        }
        completeTime = `${newHour}:${minutes}`;
        this.renderer.setProperty(this.element.nativeElement, 'value', completeTime);
        this.inputDataChanged();
        if (sendCursorToMinutes) {
            this.element.nativeElement.setSelectionRange(3, 6);
            this.fieldJustGotFocus = true;
        }
        else {
            this.element.nativeElement.setSelectionRange(0, 2);
            this.fieldJustGotFocus = false;
        }
    }
    /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    _setMinutes(hours, minutes, key) {
        /** @type {?} */
        const minutesArray = minutes.split('');
        /** @type {?} */
        const firstDigit = minutesArray[0];
        /** @type {?} */
        const secondDigit = minutesArray[1];
        /** @type {?} */
        let resetCursor = false;
        /** @type {?} */
        let newMinutes = '';
        /** @type {?} */
        let completeTime = '';
        if (key !== null) {
            if (firstDigit === '-' || this.fieldJustGotFocus) {
                newMinutes = `0${key}`;
            }
            else {
                if (Number(minutes) === 59) {
                    newMinutes = `0${key}`;
                }
                else {
                    newMinutes = `${secondDigit}${key}`;
                    if (Number(newMinutes) > 59) {
                        newMinutes = '59';
                    }
                    resetCursor = true;
                }
            }
        }
        else {
            newMinutes = `${minutes}`;
            if (Number(newMinutes) > 59) {
                newMinutes = '00';
            }
        }
        completeTime = `${hours}:${newMinutes}`;
        this.renderer.setProperty(this.element.nativeElement, 'value', completeTime);
        this.inputDataChanged();
        if (resetCursor) {
            this.element.nativeElement.setSelectionRange(0, 2);
            this.fieldJustGotFocus = true;
        }
        else {
            this.element.nativeElement.setSelectionRange(3, 6);
            this.fieldJustGotFocus = false;
        }
    }
    /*
         ** Returns the cursor position of the specified text field.
         ** Return value range is 0 - imput value length.
         */
    /**
     * @private
     * @return {?}
     */
    _getCursorPosition() {
        // Initialize
        /** @type {?} */
        let cursorPos = 0;
        /** @type {?} */
        const nativeElement = this.element.nativeElement;
        // IE Support
        if (document.hasOwnProperty('selection')) {
            // Set focus on the element
            nativeElement.focus();
            // To get cursor position, get empty selection range
            // tslint:disable-next-line: no-string-literal
            /** @type {?} */
            const oSel = document['selection'].createRange();
            // Move selection start to 0 position
            oSel.moveStart('character', -nativeElement.value.length);
            // The caret position is selection length
            cursorPos = oSel.text.length;
        }
        else if (nativeElement.selectionStart || nativeElement.selectionStart === '0') {
            // Firefox support
            cursorPos = nativeElement.selectionStart;
        }
        // Return results
        return cursorPos;
    }
    /**
     * Emit Data on Change
     * @private
     * @return {?}
     */
    inputDataChanged() {
        this.ngModel.update.emit(this.element.nativeElement.value);
        this.change.emit(this.element.nativeElement.value);
    }
}
NgxTimeMaskDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line: directive-selector
                selector: '[ngModel][ngxTimeMask]',
                providers: [NgModel],
            },] }
];
/** @nocollapse */
NgxTimeMaskDirective.ctorParameters = () => [
    { type: ElementRef, decorators: [{ type: Self }] },
    { type: Renderer2 },
    { type: NgModel }
];
NgxTimeMaskDirective.propDecorators = {
    change: [{ type: Output }],
    minHour: [{ type: Input }],
    maxHour: [{ type: Input }],
    onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    onFocus: [{ type: HostListener, args: ['focus', ['$event'],] }],
    onBlur: [{ type: HostListener, args: ['blur', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    NgxTimeMaskDirective.prototype.change;
    /** @type {?} */
    NgxTimeMaskDirective.prototype.minHour;
    /** @type {?} */
    NgxTimeMaskDirective.prototype.maxHour;
    /**
     * @type {?}
     * @private
     */
    NgxTimeMaskDirective.prototype.fieldJustGotFocus;
    /**
     * @type {?}
     * @private
     */
    NgxTimeMaskDirective.prototype.element;
    /**
     * @type {?}
     * @private
     */
    NgxTimeMaskDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NgxTimeMaskDirective.prototype.ngModel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtbWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGltZS1tYXNrLyIsInNvdXJjZXMiOlsibGliL25neC10aW1lLW1hc2suZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztNQUVuQyxTQUFTLEdBQUcsQ0FBQzs7TUFDYixTQUFTLEdBQUcsQ0FBQzs7TUFDYixHQUFHLEdBQUcsQ0FBQzs7TUFDUCxVQUFVLEdBQUcsRUFBRTs7TUFDZixRQUFRLEdBQUcsRUFBRTs7TUFDYixXQUFXLEdBQUcsRUFBRTs7TUFDaEIsVUFBVSxHQUFHLEVBQUU7O01BQ2YsTUFBTSxHQUFHLEVBQUU7O01BQ1gsSUFBSSxHQUFHLEVBQUU7O01BQ1QsSUFBSSxHQUFHLEVBQUU7O01BQ1QsV0FBVyxHQUFHLEVBQUU7O01BQ2hCLFdBQVcsR0FBRyxHQUFHO0FBTXZCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7OztJQVE3QixZQUE0QixPQUFtQixFQUFVLFFBQW1CLEVBQVUsT0FBZ0I7UUFBMUUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFTOztRQU41RixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFlBQU8sR0FBVyxFQUFFLENBQUM7UUFFdEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO0lBRXVFLENBQUM7Ozs7OztJQUkxRyxTQUFTLENBQUMsR0FBa0I7O2NBQ2xCLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTztRQUMz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RUFBRTtZQUM3RSxrQkFBa0I7WUFDbEIsU0FBUyxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUM7U0FDNUM7UUFFRCxpQkFBaUI7UUFDakIsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQzs7Ozs7O0lBR08sZ0JBQWdCO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7WUEvUkosU0FBUyxTQUFDOztnQkFFUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDdkI7Ozs7WUFuQm1CLFVBQVUsdUJBNEJiLElBQUk7WUE1QnlCLFNBQVM7WUFDOUMsT0FBTzs7O3FCQXFCWCxNQUFNO3NCQUNOLEtBQUs7c0JBQ0wsS0FBSzt3QkFPTCxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO3NCQWtDbEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztzQkFZaEMsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztxQkFZaEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQW5FaEMsc0NBQXNDOztJQUN0Qyx1Q0FBNkI7O0lBQzdCLHVDQUE4Qjs7Ozs7SUFFOUIsaURBQWtDOzs7OztJQUV0Qix1Q0FBbUM7Ozs7O0lBQUUsd0NBQTJCOzs7OztJQUFFLHVDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBSZW5kZXJlcjIsIFNlbGYsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdNb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY29uc3QgTUFDX0VOVEVSID0gMztcbmNvbnN0IEJBQ0tTUEFDRSA9IDg7XG5jb25zdCBUQUIgPSA5O1xuY29uc3QgTEVGVF9BUlJPVyA9IDM3O1xuY29uc3QgVVBfQVJST1cgPSAzODtcbmNvbnN0IFJJR0hUX0FSUk9XID0gMzk7XG5jb25zdCBET1dOX0FSUk9XID0gNDA7XG5jb25zdCBERUxFVEUgPSA0NjtcbmNvbnN0IFpFUk8gPSA0ODtcbmNvbnN0IE5JTkUgPSA1NztcbmNvbnN0IE5VTVBBRF9aRVJPID0gOTY7XG5jb25zdCBOVU1QQURfTklORSA9IDEwNTtcbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbbmdNb2RlbF1bbmd4VGltZU1hc2tdJyxcbiAgICBwcm92aWRlcnM6IFtOZ01vZGVsXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGltZU1hc2tEaXJlY3RpdmUge1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tb3V0cHV0LW5hdGl2ZVxuICAgIEBPdXRwdXQoKSBjaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgQElucHV0KCkgbWluSG91cjogbnVtYmVyID0gMTtcbiAgICBASW5wdXQoKSBtYXhIb3VyOiBudW1iZXIgPSAxMjtcblxuICAgIHByaXZhdGUgZmllbGRKdXN0R290Rm9jdXMgPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKEBTZWxmKCkgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbmdNb2RlbDogTmdNb2RlbCkge31cblxuICAgIC8qKiBMaXN0ZW5lciBvbiBLZXlkb3duICovXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2dDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBrZXlDb2RlID0gZXZ0LmtleUNvZGU7XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgVEFCOlxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrQW5kSnVtcEN1cnNvcihrZXlDb2RlLCBldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIERFTEVURTpcbiAgICAgICAgICAgIGNhc2UgQkFDS1NQQUNFOlxuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRUZXh0KG51bGwsIC0xKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRUZXh0KG51bGwsIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmICgoa2V5Q29kZSA+PSBaRVJPICYmIGtleUNvZGUgPD0gTklORSkgfHwgKGtleUNvZGUgPj0gTlVNUEFEX1pFUk8gJiYga2V5Q29kZSA8PSBOVU1QQURfTklORSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0SW5wdXRUZXh0KGV2dC5rZXksIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlDb2RlICE9PSBUQUIpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIExpc3RlbmVyIG9uIGNsaWNrICovXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soKSB7XG4gICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSB0cnVlO1xuICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID0gdGhpcy5fZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKGNhcmV0UG9zaXRpb24gPCAzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDMsIDYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIExpc3RlbmVyIG9uIGZvY3VzICovXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXMnLCBbJyRldmVudCddKVxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSB0cnVlO1xuICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID0gdGhpcy5fZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKGNhcmV0UG9zaXRpb24gPCAzKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDMsIDYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIExpc3RlbmVyIG9uIGJsdXIgKi9cbiAgICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSlcbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlRmllbGQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWxpZGF0ZUZpZWxkKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRpbWUgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICBpZiAoc2VsZWN0ZWRUaW1lWzBdID09PSAnMDAnKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRpbWUgPSBgMDE6JHtzZWxlY3RlZFRpbWVbMV19YDtcblxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3ZhbHVlJywgY29tcGxldGVUaW1lKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXREYXRhQ2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hlY2tBbmRKdW1wQ3Vyc29yKGtleUNvZGU6IG51bWJlciwgZXZ0PzogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID0gdGhpcy5fZ2V0Q3Vyc29yUG9zaXRpb24oKTtcblxuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMywgNik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBUQUI6XG4gICAgICAgICAgICAgICAgaWYgKGNhcmV0UG9zaXRpb24gPCAyICYmICFldnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMywgNik7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2FyZXRQb3NpdGlvbiA+IDIgJiYgZXZ0LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fdmFsaWRhdGVGaWVsZCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NldElucHV0VGV4dChrZXk6IHN0cmluZywgdmFsdWVUb0FwcGVuZDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGlucHV0OiBzdHJpbmdbXSA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlLnNwbGl0KCc6Jyk7XG5cbiAgICAgICAgbGV0IGhvdXJzOiBzdHJpbmcgPSBpbnB1dFswXTtcbiAgICAgICAgbGV0IG1pbnV0ZXM6IHN0cmluZyA9IGlucHV0WzFdO1xuICAgICAgICBjb25zdCBjYXJldFBvc2l0aW9uID0gdGhpcy5fZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKGNhcmV0UG9zaXRpb24gPCAzKSB7XG4gICAgICAgICAgICBob3VycyA9IHRoaXMuZ2V0SG91cnNJblN0cmluZ0FmdGVyQXBwZW5kKCtob3VycywgdmFsdWVUb0FwcGVuZCwgdGhpcy5tYXhIb3VyKTtcbiAgICAgICAgICAgIHRoaXMuX3NldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWludXRlcyA9IHRoaXMuZ2V0SG91cnNJblN0cmluZ0FmdGVyQXBwZW5kKCttaW51dGVzLCB2YWx1ZVRvQXBwZW5kLCA2MCk7XG4gICAgICAgICAgICB0aGlzLl9zZXRNaW51dGVzKGhvdXJzLCBtaW51dGVzLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SG91cnNJblN0cmluZ0FmdGVyQXBwZW5kKGhvdXJzOiBudW1iZXIsIHZhbHVlVG9BcHBlbmQ6IG51bWJlciwgbGltaXRUb1Jlc2V0OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICAvLyBIb3VycyBzaG91bGQgYmUgYi93ICAwMSAtIDEyIG9yIDAwIC0gMjMgYW5kIE1pbnV0ZXMgc2hvdWxkIGJlIDAtNTlcbiAgICAgICAgaWYgKGxpbWl0VG9SZXNldCA9PT0gdGhpcy5tYXhIb3VyKSB7XG4gICAgICAgICAgICBpZiAoaG91cnMgPD0gbGltaXRUb1Jlc2V0KSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlQWZ0ZXJBcHBlbmQgPSBob3VycyArIHZhbHVlVG9BcHBlbmQ7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlQWZ0ZXJBcHBlbmQgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlQWZ0ZXJBcHBlbmQgPSB0aGlzLm1heEhvdXI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZUFmdGVyQXBwZW5kID4gbGltaXRUb1Jlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlQWZ0ZXJBcHBlbmQgPSB0aGlzLm1heEhvdXIgPT09IDEyID8gMSA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZUFmdGVyQXBwZW5kIDwgMTAgPyBgMCR7dmFsdWVBZnRlckFwcGVuZH1gIDogYCR7dmFsdWVBZnRlckFwcGVuZH1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGhvdXJzIDw9IGxpbWl0VG9SZXNldCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUFmdGVyQXBwZW5kID0gaG91cnMgKyB2YWx1ZVRvQXBwZW5kO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZUFmdGVyQXBwZW5kIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUFmdGVyQXBwZW5kID0gNTk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZUFmdGVyQXBwZW5kID4gbGltaXRUb1Jlc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlQWZ0ZXJBcHBlbmQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVBZnRlckFwcGVuZCA8IDEwID8gYDAke3ZhbHVlQWZ0ZXJBcHBlbmR9YCA6IGAke3ZhbHVlQWZ0ZXJBcHBlbmR9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1pbkhvdXIudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRIb3Vycyhob3Vyczogc3RyaW5nLCBtaW51dGVzOiBzdHJpbmcsIGtleSkge1xuICAgICAgICBjb25zdCBob3Vyc0FycmF5OiBzdHJpbmdbXSA9IGhvdXJzLnNwbGl0KCcnKTtcbiAgICAgICAgY29uc3QgZmlyc3REaWdpdDogc3RyaW5nID0gaG91cnNBcnJheVswXTtcbiAgICAgICAgY29uc3Qgc2Vjb25kRGlnaXQ6IHN0cmluZyA9IGhvdXJzQXJyYXlbMV07XG5cbiAgICAgICAgbGV0IG5ld0hvdXIgPSAnJztcblxuICAgICAgICBsZXQgY29tcGxldGVUaW1lID0gJyc7XG4gICAgICAgIGxldCBzZW5kQ3Vyc29yVG9NaW51dGVzID0gZmFsc2U7XG4gICAgICAgIGlmIChrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdERpZ2l0ID09PSAnLScgfHwgdGhpcy5maWVsZEp1c3RHb3RGb2N1cykge1xuICAgICAgICAgICAgICAgIG5ld0hvdXIgPSBgMCR7a2V5fWA7XG4gICAgICAgICAgICAgICAgc2VuZEN1cnNvclRvTWludXRlcyA9IE51bWJlcihrZXkpID4gKHRoaXMubWF4SG91ciA+IDIwID8gMiA6IDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SG91ciA9IGAke3NlY29uZERpZ2l0fSR7K2tleSA9PT0gMCAmJiArc2Vjb25kRGlnaXQgPT09IDAgPyB0aGlzLm1pbkhvdXIudG9TdHJpbmcoKSA6IGtleX1gO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIobmV3SG91cikgPiB0aGlzLm1heEhvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3SG91ciA9IHRoaXMubWF4SG91ci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKG5ld0hvdXIpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hvdXIgPSB0aGlzLm1pbkhvdXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VuZEN1cnNvclRvTWludXRlcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIb3VyID0gYCR7aG91cnN9YDtcbiAgICAgICAgICAgIGlmIChOdW1iZXIobmV3SG91cikgPiB0aGlzLm1heEhvdXIpIHtcbiAgICAgICAgICAgICAgICBuZXdIb3VyID0gdGhpcy5tYXhIb3VyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTnVtYmVyKG5ld0hvdXIpID09PSAwICYmIHRoaXMubWF4SG91ciA9PT0gMjMpIHtcbiAgICAgICAgICAgICAgICBuZXdIb3VyID0gYDAke3RoaXMubWluSG91ci50b1N0cmluZygpfWA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE51bWJlcihuZXdIb3VyKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIG5ld0hvdXIgPSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBsZXRlVGltZSA9IGAke25ld0hvdXJ9OiR7bWludXRlc31gO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbXBsZXRlVGltZSk7XG4gICAgICAgIHRoaXMuaW5wdXREYXRhQ2hhbmdlZCgpO1xuICAgICAgICBpZiAoc2VuZEN1cnNvclRvTWludXRlcykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMywgNik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIDIpO1xuICAgICAgICAgICAgdGhpcy5maWVsZEp1c3RHb3RGb2N1cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0TWludXRlcyhob3Vyczogc3RyaW5nLCBtaW51dGVzOiBzdHJpbmcsIGtleSkge1xuICAgICAgICBjb25zdCBtaW51dGVzQXJyYXk6IHN0cmluZ1tdID0gbWludXRlcy5zcGxpdCgnJyk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGlnaXQ6IHN0cmluZyA9IG1pbnV0ZXNBcnJheVswXTtcbiAgICAgICAgY29uc3Qgc2Vjb25kRGlnaXQ6IHN0cmluZyA9IG1pbnV0ZXNBcnJheVsxXTtcbiAgICAgICAgbGV0IHJlc2V0Q3Vyc29yID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IG5ld01pbnV0ZXMgPSAnJztcblxuICAgICAgICBsZXQgY29tcGxldGVUaW1lID0gJyc7XG5cbiAgICAgICAgaWYgKGtleSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0RGlnaXQgPT09ICctJyB8fCB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzKSB7XG4gICAgICAgICAgICAgICAgbmV3TWludXRlcyA9IGAwJHtrZXl9YDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcihtaW51dGVzKSA9PT0gNTkpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TWludXRlcyA9IGAwJHtrZXl9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdNaW51dGVzID0gYCR7c2Vjb25kRGlnaXR9JHtrZXl9YDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE51bWJlcihuZXdNaW51dGVzKSA+IDU5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdNaW51dGVzID0gJzU5JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNldEN1cnNvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3TWludXRlcyA9IGAke21pbnV0ZXN9YDtcbiAgICAgICAgICAgIGlmIChOdW1iZXIobmV3TWludXRlcykgPiA1OSkge1xuICAgICAgICAgICAgICAgIG5ld01pbnV0ZXMgPSAnMDAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29tcGxldGVUaW1lID0gYCR7aG91cnN9OiR7bmV3TWludXRlc31gO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbXBsZXRlVGltZSk7XG4gICAgICAgIHRoaXMuaW5wdXREYXRhQ2hhbmdlZCgpO1xuICAgICAgICBpZiAocmVzZXRDdXJzb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIDIpO1xuICAgICAgICAgICAgdGhpcy5maWVsZEp1c3RHb3RGb2N1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgzLCA2KTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICoqIFJldHVybnMgdGhlIGN1cnNvciBwb3NpdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHRleHQgZmllbGQuXG4gICAgICoqIFJldHVybiB2YWx1ZSByYW5nZSBpcyAwIC0gaW1wdXQgdmFsdWUgbGVuZ3RoLlxuICAgICAqL1xuICAgIHByaXZhdGUgX2dldEN1cnNvclBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIC8vIEluaXRpYWxpemVcbiAgICAgICAgbGV0IGN1cnNvclBvcyA9IDA7XG5cbiAgICAgICAgY29uc3QgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIElFIFN1cHBvcnRcbiAgICAgICAgaWYgKGRvY3VtZW50Lmhhc093blByb3BlcnR5KCdzZWxlY3Rpb24nKSkge1xuICAgICAgICAgICAgLy8gU2V0IGZvY3VzIG9uIHRoZSBlbGVtZW50XG4gICAgICAgICAgICBuYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgICAgIC8vIFRvIGdldCBjdXJzb3IgcG9zaXRpb24sIGdldCBlbXB0eSBzZWxlY3Rpb24gcmFuZ2VcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tc3RyaW5nLWxpdGVyYWxcbiAgICAgICAgICAgIGNvbnN0IG9TZWwgPSBkb2N1bWVudFsnc2VsZWN0aW9uJ10uY3JlYXRlUmFuZ2UoKTtcblxuICAgICAgICAgICAgLy8gTW92ZSBzZWxlY3Rpb24gc3RhcnQgdG8gMCBwb3NpdGlvblxuICAgICAgICAgICAgb1NlbC5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC1uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIFRoZSBjYXJldCBwb3NpdGlvbiBpcyBzZWxlY3Rpb24gbGVuZ3RoXG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBvU2VsLnRleHQubGVuZ3RoO1xuICAgICAgICB9IGVsc2UgaWYgKG5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgfHwgbmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9PT0gJzAnKSB7XG4gICAgICAgICAgICAvLyBGaXJlZm94IHN1cHBvcnRcbiAgICAgICAgICAgIGN1cnNvclBvcyA9IG5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gcmVzdWx0c1xuICAgICAgICByZXR1cm4gY3Vyc29yUG9zO1xuICAgIH1cblxuICAgIC8qKiBFbWl0IERhdGEgb24gQ2hhbmdlICAqL1xuICAgIHByaXZhdGUgaW5wdXREYXRhQ2hhbmdlZCgpIHtcbiAgICAgICAgdGhpcy5uZ01vZGVsLnVwZGF0ZS5lbWl0KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgfVxufVxuIl19