import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

import { NOTE_COLOR_OPTIONS } from 'src/app/constants';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {
  @Input('color') color: string;
  @Output('color-change') colorChange: EventEmitter<string>;
  @ViewChild('dropdown') dropDown: ElementRef;

  showDropdown: boolean;
  dropdownOptions: Array<string>;
  selected: string;

  constructor() {
    this.color = NOTE_COLOR_OPTIONS[0];
    this.colorChange = new EventEmitter();
    this.dropDown = {} as ElementRef;
    this.showDropdown = false;
    this.dropdownOptions = Object.values(NOTE_COLOR_OPTIONS);
    this.selected = this.dropdownOptions[0];
  }

  ngOnInit(): void {
    if (this.color) 
      this.selected = this.color;
  }

  onColorChange(event: any) {
    const colorKey = Object.keys(NOTE_COLOR_OPTIONS).find(
      (e) => NOTE_COLOR_OPTIONS[e] === event
    );
    this.selected = event;
    this.showDropdown = false;
    this.colorChange.emit(colorKey);
  }
}
