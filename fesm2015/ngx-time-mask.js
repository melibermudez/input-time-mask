import { EventEmitter, Directive, ElementRef, Self, Renderer2, Output, Input, HostListener, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-time-mask.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
class NgxTimeMaskDirective {
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-time-mask.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTimeMaskModule {
}
NgxTimeMaskModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxTimeMaskDirective],
                imports: [],
                exports: [NgxTimeMaskDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-time-mask.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxTimeMaskDirective, NgxTimeMaskModule };
//# sourceMappingURL=ngx-time-mask.js.map
