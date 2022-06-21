(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngx-time-mask', ['exports', '@angular/core', '@angular/forms'], factory) :
    (global = global || self, factory(global['ngx-time-mask'] = {}, global.ng.core, global.ng.forms));
}(this, (function (exports, core, forms) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-time-mask.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            this.change = new core.EventEmitter();
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
            { type: core.Directive, args: [{
                        // tslint:disable-next-line: directive-selector
                        selector: '[ngModel][ngxTimeMask]',
                        providers: [forms.NgModel],
                    },] }
        ];
        /** @nocollapse */
        NgxTimeMaskDirective.ctorParameters = function () { return [
            { type: core.ElementRef, decorators: [{ type: core.Self }] },
            { type: core.Renderer2 },
            { type: forms.NgModel }
        ]; };
        NgxTimeMaskDirective.propDecorators = {
            change: [{ type: core.Output }],
            minHour: [{ type: core.Input }],
            maxHour: [{ type: core.Input }],
            onKeyDown: [{ type: core.HostListener, args: ['keydown', ['$event'],] }],
            onClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
            onFocus: [{ type: core.HostListener, args: ['focus', ['$event'],] }],
            onBlur: [{ type: core.HostListener, args: ['blur', ['$event'],] }]
        };
        return NgxTimeMaskDirective;
    }());
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
    var NgxTimeMaskModule = /** @class */ (function () {
        function NgxTimeMaskModule() {
        }
        NgxTimeMaskModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [NgxTimeMaskDirective],
                        imports: [],
                        exports: [NgxTimeMaskDirective]
                    },] }
        ];
        return NgxTimeMaskModule;
    }());

    exports.NgxTimeMaskDirective = NgxTimeMaskDirective;
    exports.NgxTimeMaskModule = NgxTimeMaskModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-time-mask.umd.js.map
