/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-time-mask.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostListener, Renderer2, Self, EventEmitter, Output, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
/** @type {?} */
var MAC_ENTER = 3;
/** @type {?} */
var BACKSPACE = 8;
/** @type {?} */
var TAB = 9;
/** @type {?} */
var LEFT_ARROW = 37;
/** @type {?} */
var UP_ARROW = 38;
/** @type {?} */
var RIGHT_ARROW = 39;
/** @type {?} */
var DOWN_ARROW = 40;
/** @type {?} */
var DELETE = 46;
/** @type {?} */
var ZERO = 48;
/** @type {?} */
var NINE = 57;
/** @type {?} */
var NUMPAD_ZERO = 96;
/** @type {?} */
var NUMPAD_NINE = 105;
var NgxTimeMaskDirective = /** @class */ (function () {
    function NgxTimeMaskDirective(element, renderer, ngModel) {
        this.element = element;
        this.renderer = renderer;
        this.ngModel = ngModel;
        // tslint:disable-next-line: no-output-native
        this.change = new EventEmitter();
        this.minHour = 1;
        this.maxHour = 12;
        this.fieldJustGotFocus = false;
    }
    /** Listener on Keydown */
    /**
     * Listener on Keydown
     * @param {?} evt
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.onKeyDown = /**
     * Listener on Keydown
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        /** @type {?} */
        var keyCode = evt.keyCode;
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
    };
    /** Listener on click */
    /**
     * Listener on click
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.onClick = /**
     * Listener on click
     * @return {?}
     */
    function () {
        this.fieldJustGotFocus = true;
        /** @type {?} */
        var caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            this.element.nativeElement.setSelectionRange(0, 2);
        }
        else {
            this.element.nativeElement.setSelectionRange(3, 6);
        }
    };
    /** Listener on focus */
    /**
     * Listener on focus
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.onFocus = /**
     * Listener on focus
     * @return {?}
     */
    function () {
        this.fieldJustGotFocus = true;
        /** @type {?} */
        var caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            this.element.nativeElement.setSelectionRange(0, 2);
        }
        else {
            this.element.nativeElement.setSelectionRange(3, 6);
        }
    };
    /** Listener on blur */
    /**
     * Listener on blur
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.onBlur = /**
     * Listener on blur
     * @return {?}
     */
    function () {
        this._validateField();
    };
    /**
     * @private
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._validateField = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedTime = this.element.nativeElement.value.split(':');
        if (selectedTime[0] === '00') {
            /** @type {?} */
            var completeTime = "01:" + selectedTime[1];
            this.renderer.setProperty(this.element.nativeElement, 'value', completeTime);
            this.inputDataChanged();
        }
    };
    /**
     * @private
     * @param {?} keyCode
     * @param {?=} evt
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._checkAndJumpCursor = /**
     * @private
     * @param {?} keyCode
     * @param {?=} evt
     * @return {?}
     */
    function (keyCode, evt) {
        /** @type {?} */
        var caretPosition = this._getCursorPosition();
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
    };
    /**
     * @private
     * @param {?} key
     * @param {?} valueToAppend
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._setInputText = /**
     * @private
     * @param {?} key
     * @param {?} valueToAppend
     * @return {?}
     */
    function (key, valueToAppend) {
        /** @type {?} */
        var input = this.element.nativeElement.value.split(':');
        /** @type {?} */
        var hours = input[0];
        /** @type {?} */
        var minutes = input[1];
        /** @type {?} */
        var caretPosition = this._getCursorPosition();
        if (caretPosition < 3) {
            hours = this.getHoursInStringAfterAppend(+hours, valueToAppend, this.maxHour);
            this._setHours(hours, minutes, key);
        }
        else {
            minutes = this.getHoursInStringAfterAppend(+minutes, valueToAppend, 60);
            this._setMinutes(hours, minutes, key);
        }
    };
    /**
     * @param {?} hours
     * @param {?} valueToAppend
     * @param {?} limitToReset
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.getHoursInStringAfterAppend = /**
     * @param {?} hours
     * @param {?} valueToAppend
     * @param {?} limitToReset
     * @return {?}
     */
    function (hours, valueToAppend, limitToReset) {
        // Hours should be b/w  01 - 12 or 00 - 23 and Minutes should be 0-59
        if (limitToReset === this.maxHour) {
            if (hours <= limitToReset) {
                /** @type {?} */
                var valueAfterAppend = hours + valueToAppend;
                if (valueAfterAppend < 0) {
                    valueAfterAppend = this.maxHour;
                }
                else if (valueAfterAppend > limitToReset) {
                    valueAfterAppend = this.maxHour === 12 ? 1 : 0;
                }
                return valueAfterAppend < 10 ? "0" + valueAfterAppend : "" + valueAfterAppend;
            }
        }
        else {
            if (hours <= limitToReset) {
                /** @type {?} */
                var valueAfterAppend = hours + valueToAppend;
                if (valueAfterAppend < 0) {
                    valueAfterAppend = 59;
                }
                else if (valueAfterAppend > limitToReset) {
                    valueAfterAppend = 0;
                }
                return valueAfterAppend < 10 ? "0" + valueAfterAppend : "" + valueAfterAppend;
            }
        }
        return this.minHour.toString();
    };
    /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._setHours = /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    function (hours, minutes, key) {
        /** @type {?} */
        var hoursArray = hours.split('');
        /** @type {?} */
        var firstDigit = hoursArray[0];
        /** @type {?} */
        var secondDigit = hoursArray[1];
        /** @type {?} */
        var newHour = '';
        /** @type {?} */
        var completeTime = '';
        /** @type {?} */
        var sendCursorToMinutes = false;
        if (key !== null) {
            if (firstDigit === '-' || this.fieldJustGotFocus) {
                newHour = "0" + key;
                sendCursorToMinutes = Number(key) > (this.maxHour > 20 ? 2 : 1);
                this.fieldJustGotFocus = false;
            }
            else {
                newHour = "" + secondDigit + (+key === 0 && +secondDigit === 0 ? this.minHour.toString() : key);
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
            newHour = "" + hours;
            if (Number(newHour) > this.maxHour) {
                newHour = this.maxHour.toString();
            }
            if (Number(newHour) === 0 && this.maxHour === 23) {
                newHour = "0" + this.minHour.toString();
            }
            else if (Number(newHour) === 0) {
                newHour = this.maxHour.toString();
            }
        }
        completeTime = newHour + ":" + minutes;
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
    };
    /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._setMinutes = /**
     * @private
     * @param {?} hours
     * @param {?} minutes
     * @param {?} key
     * @return {?}
     */
    function (hours, minutes, key) {
        /** @type {?} */
        var minutesArray = minutes.split('');
        /** @type {?} */
        var firstDigit = minutesArray[0];
        /** @type {?} */
        var secondDigit = minutesArray[1];
        /** @type {?} */
        var resetCursor = false;
        /** @type {?} */
        var newMinutes = '';
        /** @type {?} */
        var completeTime = '';
        if (key !== null) {
            if (firstDigit === '-' || this.fieldJustGotFocus) {
                newMinutes = "0" + key;
            }
            else {
                if (Number(minutes) === 59) {
                    newMinutes = "0" + key;
                }
                else {
                    newMinutes = "" + secondDigit + key;
                    if (Number(newMinutes) > 59) {
                        newMinutes = '59';
                    }
                    resetCursor = true;
                }
            }
        }
        else {
            newMinutes = "" + minutes;
            if (Number(newMinutes) > 59) {
                newMinutes = '00';
            }
        }
        completeTime = hours + ":" + newMinutes;
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
    };
    /*
     ** Returns the cursor position of the specified text field.
     ** Return value range is 0 - imput value length.
     */
    /*
         ** Returns the cursor position of the specified text field.
         ** Return value range is 0 - imput value length.
         */
    /**
     * @private
     * @return {?}
     */
    NgxTimeMaskDirective.prototype._getCursorPosition = /*
         ** Returns the cursor position of the specified text field.
         ** Return value range is 0 - imput value length.
         */
    /**
     * @private
     * @return {?}
     */
    function () {
        // Initialize
        /** @type {?} */
        var cursorPos = 0;
        /** @type {?} */
        var nativeElement = this.element.nativeElement;
        // IE Support
        if (document.hasOwnProperty('selection')) {
            // Set focus on the element
            nativeElement.focus();
            // To get cursor position, get empty selection range
            // tslint:disable-next-line: no-string-literal
            /** @type {?} */
            var oSel = document['selection'].createRange();
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
    };
    /** Emit Data on Change  */
    /**
     * Emit Data on Change
     * @private
     * @return {?}
     */
    NgxTimeMaskDirective.prototype.inputDataChanged = /**
     * Emit Data on Change
     * @private
     * @return {?}
     */
    function () {
        this.ngModel.update.emit(this.element.nativeElement.value);
        this.change.emit(this.element.nativeElement.value);
    };
    NgxTimeMaskDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line: directive-selector
                    selector: '[ngModel][ngxTimeMask]',
                    providers: [NgModel],
                },] }
    ];
    /** @nocollapse */
    NgxTimeMaskDirective.ctorParameters = function () { return [
        { type: ElementRef, decorators: [{ type: Self }] },
        { type: Renderer2 },
        { type: NgModel }
    ]; };
    NgxTimeMaskDirective.propDecorators = {
        change: [{ type: Output }],
        minHour: [{ type: Input }],
        maxHour: [{ type: Input }],
        onKeyDown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        onFocus: [{ type: HostListener, args: ['focus', ['$event'],] }],
        onBlur: [{ type: HostListener, args: ['blur', ['$event'],] }]
    };
    return NgxTimeMaskDirective;
}());
export { NgxTimeMaskDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtbWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGltZS1tYXNrLyIsInNvdXJjZXMiOlsibGliL25neC10aW1lLW1hc2suZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUVuQyxTQUFTLEdBQUcsQ0FBQzs7SUFDYixTQUFTLEdBQUcsQ0FBQzs7SUFDYixHQUFHLEdBQUcsQ0FBQzs7SUFDUCxVQUFVLEdBQUcsRUFBRTs7SUFDZixRQUFRLEdBQUcsRUFBRTs7SUFDYixXQUFXLEdBQUcsRUFBRTs7SUFDaEIsVUFBVSxHQUFHLEVBQUU7O0lBQ2YsTUFBTSxHQUFHLEVBQUU7O0lBQ1gsSUFBSSxHQUFHLEVBQUU7O0lBQ1QsSUFBSSxHQUFHLEVBQUU7O0lBQ1QsV0FBVyxHQUFHLEVBQUU7O0lBQ2hCLFdBQVcsR0FBRyxHQUFHO0FBQ3ZCO0lBYUksOEJBQTRCLE9BQW1CLEVBQVUsUUFBbUIsRUFBVSxPQUFnQjtRQUExRSxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVM7O1FBTjVGLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUV0QixzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUFFdUUsQ0FBQztJQUUxRywwQkFBMEI7Ozs7OztJQUUxQix3Q0FBUzs7Ozs7SUFEVCxVQUNVLEdBQWtCOztZQUNsQixPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU87UUFD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d0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgUmVuZGVyZXIyLCBTZWxmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmNvbnN0IE1BQ19FTlRFUiA9IDM7XG5jb25zdCBCQUNLU1BBQ0UgPSA4O1xuY29uc3QgVEFCID0gOTtcbmNvbnN0IExFRlRfQVJST1cgPSAzNztcbmNvbnN0IFVQX0FSUk9XID0gMzg7XG5jb25zdCBSSUdIVF9BUlJPVyA9IDM5O1xuY29uc3QgRE9XTl9BUlJPVyA9IDQwO1xuY29uc3QgREVMRVRFID0gNDY7XG5jb25zdCBaRVJPID0gNDg7XG5jb25zdCBOSU5FID0gNTc7XG5jb25zdCBOVU1QQURfWkVSTyA9IDk2O1xuY29uc3QgTlVNUEFEX05JTkUgPSAxMDU7XG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW25nTW9kZWxdW25neFRpbWVNYXNrXScsXG4gICAgcHJvdmlkZXJzOiBbTmdNb2RlbF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVNYXNrRGlyZWN0aXZlIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLW91dHB1dC1uYXRpdmVcbiAgICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIEBJbnB1dCgpIG1pbkhvdXI6IG51bWJlciA9IDE7XG4gICAgQElucHV0KCkgbWF4SG91cjogbnVtYmVyID0gMTI7XG5cbiAgICBwcml2YXRlIGZpZWxkSnVzdEdvdEZvY3VzID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihAU2VsZigpIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIG5nTW9kZWw6IE5nTW9kZWwpIHt9XG5cbiAgICAvKiogTGlzdGVuZXIgb24gS2V5ZG93biAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxuICAgIG9uS2V5RG93bihldnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3Qga2V5Q29kZSA9IGV2dC5rZXlDb2RlO1xuICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgICAgICBjYXNlIFRBQjpcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0FuZEp1bXBDdXJzb3Ioa2V5Q29kZSwgZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBERUxFVEU6XG4gICAgICAgICAgICBjYXNlIEJBQ0tTUEFDRTpcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX3NldElucHV0VGV4dChudWxsLCAtMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuX3NldElucHV0VGV4dChudWxsLCAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoKGtleUNvZGUgPj0gWkVSTyAmJiBrZXlDb2RlIDw9IE5JTkUpIHx8IChrZXlDb2RlID49IE5VTVBBRF9aRVJPICYmIGtleUNvZGUgPD0gTlVNUEFEX05JTkUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldElucHV0VGV4dChldnQua2V5LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5Q29kZSAhPT0gVEFCKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBMaXN0ZW5lciBvbiBjbGljayAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKCkge1xuICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IHRoaXMuX2dldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGlmIChjYXJldFBvc2l0aW9uIDwgMykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgzLCA2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBMaXN0ZW5lciBvbiBmb2N1cyAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSlcbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IHRoaXMuX2dldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGlmIChjYXJldFBvc2l0aW9uIDwgMykge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgzLCA2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBMaXN0ZW5lciBvbiBibHVyICovXG4gICAgQEhvc3RMaXN0ZW5lcignYmx1cicsIFsnJGV2ZW50J10pXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLl92YWxpZGF0ZUZpZWxkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsaWRhdGVGaWVsZCgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUaW1lID0gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkVGltZVswXSA9PT0gJzAwJykge1xuICAgICAgICAgICAgY29uc3QgY29tcGxldGVUaW1lID0gYDAxOiR7c2VsZWN0ZWRUaW1lWzFdfWA7XG5cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIGNvbXBsZXRlVGltZSk7XG4gICAgICAgICAgICB0aGlzLmlucHV0RGF0YUNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2NoZWNrQW5kSnVtcEN1cnNvcihrZXlDb2RlOiBudW1iZXIsIGV2dD86IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IHRoaXMuX2dldEN1cnNvclBvc2l0aW9uKCk7XG5cbiAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDMsIDYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgVEFCOlxuICAgICAgICAgICAgICAgIGlmIChjYXJldFBvc2l0aW9uIDwgMiAmJiAhZXZ0LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDMsIDYpO1xuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNhcmV0UG9zaXRpb24gPiAyICYmIGV2dC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maWVsZEp1c3RHb3RGb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3ZhbGlkYXRlRmllbGQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9zZXRJbnB1dFRleHQoa2V5OiBzdHJpbmcsIHZhbHVlVG9BcHBlbmQ6IG51bWJlcikge1xuICAgICAgICBjb25zdCBpbnB1dDogc3RyaW5nW10gPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZS5zcGxpdCgnOicpO1xuXG4gICAgICAgIGxldCBob3Vyczogc3RyaW5nID0gaW5wdXRbMF07XG4gICAgICAgIGxldCBtaW51dGVzOiBzdHJpbmcgPSBpbnB1dFsxXTtcbiAgICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IHRoaXMuX2dldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGlmIChjYXJldFBvc2l0aW9uIDwgMykge1xuICAgICAgICAgICAgaG91cnMgPSB0aGlzLmdldEhvdXJzSW5TdHJpbmdBZnRlckFwcGVuZCgraG91cnMsIHZhbHVlVG9BcHBlbmQsIHRoaXMubWF4SG91cik7XG4gICAgICAgICAgICB0aGlzLl9zZXRIb3Vycyhob3VycywgbWludXRlcywga2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbnV0ZXMgPSB0aGlzLmdldEhvdXJzSW5TdHJpbmdBZnRlckFwcGVuZCgrbWludXRlcywgdmFsdWVUb0FwcGVuZCwgNjApO1xuICAgICAgICAgICAgdGhpcy5fc2V0TWludXRlcyhob3VycywgbWludXRlcywga2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEhvdXJzSW5TdHJpbmdBZnRlckFwcGVuZChob3VyczogbnVtYmVyLCB2YWx1ZVRvQXBwZW5kOiBudW1iZXIsIGxpbWl0VG9SZXNldDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgLy8gSG91cnMgc2hvdWxkIGJlIGIvdyAgMDEgLSAxMiBvciAwMCAtIDIzIGFuZCBNaW51dGVzIHNob3VsZCBiZSAwLTU5XG4gICAgICAgIGlmIChsaW1pdFRvUmVzZXQgPT09IHRoaXMubWF4SG91cikge1xuICAgICAgICAgICAgaWYgKGhvdXJzIDw9IGxpbWl0VG9SZXNldCkge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZUFmdGVyQXBwZW5kID0gaG91cnMgKyB2YWx1ZVRvQXBwZW5kO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZUFmdGVyQXBwZW5kIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUFmdGVyQXBwZW5kID0gdGhpcy5tYXhIb3VyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVBZnRlckFwcGVuZCA+IGxpbWl0VG9SZXNldCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUFmdGVyQXBwZW5kID0gdGhpcy5tYXhIb3VyID09PSAxMiA/IDEgOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVBZnRlckFwcGVuZCA8IDEwID8gYDAke3ZhbHVlQWZ0ZXJBcHBlbmR9YCA6IGAke3ZhbHVlQWZ0ZXJBcHBlbmR9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChob3VycyA8PSBsaW1pdFRvUmVzZXQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVBZnRlckFwcGVuZCA9IGhvdXJzICsgdmFsdWVUb0FwcGVuZDtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVBZnRlckFwcGVuZCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVBZnRlckFwcGVuZCA9IDU5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWVBZnRlckFwcGVuZCA+IGxpbWl0VG9SZXNldCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZUFmdGVyQXBwZW5kID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlQWZ0ZXJBcHBlbmQgPCAxMCA/IGAwJHt2YWx1ZUFmdGVyQXBwZW5kfWAgOiBgJHt2YWx1ZUFmdGVyQXBwZW5kfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5taW5Ib3VyLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc2V0SG91cnMoaG91cnM6IHN0cmluZywgbWludXRlczogc3RyaW5nLCBrZXkpIHtcbiAgICAgICAgY29uc3QgaG91cnNBcnJheTogc3RyaW5nW10gPSBob3Vycy5zcGxpdCgnJyk7XG4gICAgICAgIGNvbnN0IGZpcnN0RGlnaXQ6IHN0cmluZyA9IGhvdXJzQXJyYXlbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZERpZ2l0OiBzdHJpbmcgPSBob3Vyc0FycmF5WzFdO1xuXG4gICAgICAgIGxldCBuZXdIb3VyID0gJyc7XG5cbiAgICAgICAgbGV0IGNvbXBsZXRlVGltZSA9ICcnO1xuICAgICAgICBsZXQgc2VuZEN1cnNvclRvTWludXRlcyA9IGZhbHNlO1xuICAgICAgICBpZiAoa2V5ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3REaWdpdCA9PT0gJy0nIHx8IHRoaXMuZmllbGRKdXN0R290Rm9jdXMpIHtcbiAgICAgICAgICAgICAgICBuZXdIb3VyID0gYDAke2tleX1gO1xuICAgICAgICAgICAgICAgIHNlbmRDdXJzb3JUb01pbnV0ZXMgPSBOdW1iZXIoa2V5KSA+ICh0aGlzLm1heEhvdXIgPiAyMCA/IDIgOiAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0hvdXIgPSBgJHtzZWNvbmREaWdpdH0keytrZXkgPT09IDAgJiYgK3NlY29uZERpZ2l0ID09PSAwID8gdGhpcy5taW5Ib3VyLnRvU3RyaW5nKCkgOiBrZXl9YDtcbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyKG5ld0hvdXIpID4gdGhpcy5tYXhIb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hvdXIgPSB0aGlzLm1heEhvdXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKE51bWJlcihuZXdIb3VyKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdIb3VyID0gdGhpcy5taW5Ib3VyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbmRDdXJzb3JUb01pbnV0ZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SG91ciA9IGAke2hvdXJzfWA7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKG5ld0hvdXIpID4gdGhpcy5tYXhIb3VyKSB7XG4gICAgICAgICAgICAgICAgbmV3SG91ciA9IHRoaXMubWF4SG91ci50b1N0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE51bWJlcihuZXdIb3VyKSA9PT0gMCAmJiB0aGlzLm1heEhvdXIgPT09IDIzKSB7XG4gICAgICAgICAgICAgICAgbmV3SG91ciA9IGAwJHt0aGlzLm1pbkhvdXIudG9TdHJpbmcoKX1gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChOdW1iZXIobmV3SG91cikgPT09IDApIHtcbiAgICAgICAgICAgICAgICBuZXdIb3VyID0gdGhpcy5tYXhIb3VyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb21wbGV0ZVRpbWUgPSBgJHtuZXdIb3VyfToke21pbnV0ZXN9YDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBjb21wbGV0ZVRpbWUpO1xuICAgICAgICB0aGlzLmlucHV0RGF0YUNoYW5nZWQoKTtcbiAgICAgICAgaWYgKHNlbmRDdXJzb3JUb01pbnV0ZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDMsIDYpO1xuICAgICAgICAgICAgdGhpcy5maWVsZEp1c3RHb3RGb2N1cyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3NldE1pbnV0ZXMoaG91cnM6IHN0cmluZywgbWludXRlczogc3RyaW5nLCBrZXkpIHtcbiAgICAgICAgY29uc3QgbWludXRlc0FycmF5OiBzdHJpbmdbXSA9IG1pbnV0ZXMuc3BsaXQoJycpO1xuICAgICAgICBjb25zdCBmaXJzdERpZ2l0OiBzdHJpbmcgPSBtaW51dGVzQXJyYXlbMF07XG4gICAgICAgIGNvbnN0IHNlY29uZERpZ2l0OiBzdHJpbmcgPSBtaW51dGVzQXJyYXlbMV07XG4gICAgICAgIGxldCByZXNldEN1cnNvciA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBuZXdNaW51dGVzID0gJyc7XG5cbiAgICAgICAgbGV0IGNvbXBsZXRlVGltZSA9ICcnO1xuXG4gICAgICAgIGlmIChrZXkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdERpZ2l0ID09PSAnLScgfHwgdGhpcy5maWVsZEp1c3RHb3RGb2N1cykge1xuICAgICAgICAgICAgICAgIG5ld01pbnV0ZXMgPSBgMCR7a2V5fWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIobWludXRlcykgPT09IDU5KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld01pbnV0ZXMgPSBgMCR7a2V5fWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TWludXRlcyA9IGAke3NlY29uZERpZ2l0fSR7a2V5fWA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChOdW1iZXIobmV3TWludXRlcykgPiA1OSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3TWludXRlcyA9ICc1OSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzZXRDdXJzb3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld01pbnV0ZXMgPSBgJHttaW51dGVzfWA7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKG5ld01pbnV0ZXMpID4gNTkpIHtcbiAgICAgICAgICAgICAgICBuZXdNaW51dGVzID0gJzAwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbXBsZXRlVGltZSA9IGAke2hvdXJzfToke25ld01pbnV0ZXN9YDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCBjb21wbGV0ZVRpbWUpO1xuICAgICAgICB0aGlzLmlucHV0RGF0YUNoYW5nZWQoKTtcbiAgICAgICAgaWYgKHJlc2V0Q3Vyc29yKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAyKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRKdXN0R290Rm9jdXMgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMywgNik7XG4gICAgICAgICAgICB0aGlzLmZpZWxkSnVzdEdvdEZvY3VzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKlxuICAgICAqKiBSZXR1cm5zIHRoZSBjdXJzb3IgcG9zaXRpb24gb2YgdGhlIHNwZWNpZmllZCB0ZXh0IGZpZWxkLlxuICAgICAqKiBSZXR1cm4gdmFsdWUgcmFuZ2UgaXMgMCAtIGltcHV0IHZhbHVlIGxlbmd0aC5cbiAgICAgKi9cbiAgICBwcml2YXRlIF9nZXRDdXJzb3JQb3NpdGlvbigpOiBudW1iZXIge1xuICAgICAgICAvLyBJbml0aWFsaXplXG4gICAgICAgIGxldCBjdXJzb3JQb3MgPSAwO1xuXG4gICAgICAgIGNvbnN0IG5hdGl2ZUVsZW1lbnQgPSB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBJRSBTdXBwb3J0XG4gICAgICAgIGlmIChkb2N1bWVudC5oYXNPd25Qcm9wZXJ0eSgnc2VsZWN0aW9uJykpIHtcbiAgICAgICAgICAgIC8vIFNldCBmb2N1cyBvbiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgbmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgICAgICAgICAvLyBUbyBnZXQgY3Vyc29yIHBvc2l0aW9uLCBnZXQgZW1wdHkgc2VsZWN0aW9uIHJhbmdlXG4gICAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IG5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgICAgICBjb25zdCBvU2VsID0gZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKCk7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgc2VsZWN0aW9uIHN0YXJ0IHRvIDAgcG9zaXRpb25cbiAgICAgICAgICAgIG9TZWwubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCAtbmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgICAgICAvLyBUaGUgY2FyZXQgcG9zaXRpb24gaXMgc2VsZWN0aW9uIGxlbmd0aFxuICAgICAgICAgICAgY3Vyc29yUG9zID0gb1NlbC50ZXh0Lmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIGlmIChuYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0IHx8IG5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPT09ICcwJykge1xuICAgICAgICAgICAgLy8gRmlyZWZveCBzdXBwb3J0XG4gICAgICAgICAgICBjdXJzb3JQb3MgPSBuYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIHJlc3VsdHNcbiAgICAgICAgcmV0dXJuIGN1cnNvclBvcztcbiAgICB9XG5cbiAgICAvKiogRW1pdCBEYXRhIG9uIENoYW5nZSAgKi9cbiAgICBwcml2YXRlIGlucHV0RGF0YUNoYW5nZWQoKSB7XG4gICAgICAgIHRoaXMubmdNb2RlbC51cGRhdGUuZW1pdCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudC52YWx1ZSk7XG4gICAgICAgIHRoaXMuY2hhbmdlLmVtaXQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgIH1cbn1cbiJdfQ==