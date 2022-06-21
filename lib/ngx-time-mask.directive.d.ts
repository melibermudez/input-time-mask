import { ElementRef, Renderer2, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
export declare class NgxTimeMaskDirective {
    private element;
    private renderer;
    private ngModel;
    change: EventEmitter<any>;
    minHour: number;
    maxHour: number;
    private fieldJustGotFocus;
    constructor(element: ElementRef, renderer: Renderer2, ngModel: NgModel);
    /** Listener on Keydown */
    onKeyDown(evt: KeyboardEvent): void;
    /** Listener on click */
    onClick(): void;
    /** Listener on focus */
    onFocus(): void;
    /** Listener on blur */
    onBlur(): void;
    private _validateField;
    private _checkAndJumpCursor;
    private _setInputText;
    getHoursInStringAfterAppend(hours: number, valueToAppend: number, limitToReset: number): string;
    private _setHours;
    private _setMinutes;
    private _getCursorPosition;
    /** Emit Data on Change  */
    private inputDataChanged;
}
