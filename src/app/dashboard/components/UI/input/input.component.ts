import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() parentForm!: FormGroup;
  @Input() fieldName!: string;
  @Input() formControlName!: string;
  @Input() label!: string;

  value!: string;
  touched!: () => void;
  isDisable!: boolean;

  changed!: (val: string) => void;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  writeValue(val: string): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.changed = fn.value;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisable = isDisabled;
  }
}
