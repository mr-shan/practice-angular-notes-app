import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

import { Note } from '../notes/note.model';
import { NOTE_COLOR_OPTIONS } from '../constants';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css'],
})
export class NewNoteComponent implements OnInit {
  @ViewChild('mainBody', { static: false }) mainBody = {} as ElementRef;
  @ViewChild('backslash', { static: false }) backslash = {} as ElementRef;

  @Input('data') data: Note | null = null;

  @Output('save') saveNoteEvent: EventEmitter<any>;
  @Output('cancel') cancelEvent: EventEmitter<any>;

  name: string;
  content: string;
  shade: string;
  mode: string = 'new';
  colorOptions: Array<string>;

  constructor() {
    this.saveNoteEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();
    this.colorOptions = Object.keys(NOTE_COLOR_OPTIONS);

    this.name = '';
    this.content = '';
    this.shade = NOTE_COLOR_OPTIONS.YELLOW;
  }

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      this.content = this.data.content;
      this.mode = 'edit';
      this.shade = this.data.shade;
    }
  }

  onSaveNote() {
    if (!(this.name && this.content)) return;

    this.setClosingAnimations();

    setTimeout(() => {
      this.saveNoteEvent.emit({
        name: this.name,
        content: this.content,
        mode: this.mode,
        id: this.data?.id || null,
        shade: this.shade,
      });

      this.name = '';
      this.content = '';
    }, 500);
  }

  onCancel() {
    this.setClosingAnimations();
    setTimeout(() => {
      this.cancelEvent.emit();
    }, 500);
  }

  onColorChange(event: any) {
    const colorOption = event.target.value || 'YELLOW';
    this.shade = NOTE_COLOR_OPTIONS[colorOption];
  }

  setClosingAnimations() {
    this.mainBody.nativeElement.classList.add('main-body-pop-out');
    this.backslash.nativeElement.classList.add('backslash-fade-out');
  }
}
