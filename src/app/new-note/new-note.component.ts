import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Note } from '../notes/note.model';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent {
  @ViewChild('mainBody', { static: false }) mainBody = {} as ElementRef;
  @ViewChild('backslash', { static: false}) backslash = {} as ElementRef;
  @Output('save') saveNoteEvent: EventEmitter<Note>
  @Output('cancel') cancelEvent: EventEmitter<any>;

  name: string;
  content: string;

  constructor() {
    this.saveNoteEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter()

    this.name = '';
    this.content = '';
  }

  onSaveNote() {
    if (!(this.name && this.content)) return;

    this.setClosingAnimations();

    setTimeout(() => {
      this.saveNoteEvent.emit(
        new Note(this.name, this.content)
      )
  
      this.name = '';
      this.content = '';
    }, 500)
  }

  onCancel() {
    this.setClosingAnimations();
    setTimeout(() => {
      this.cancelEvent.emit();
    }, 500);
  }

  setClosingAnimations() {
    this.mainBody.nativeElement.classList.add('main-body-pop-out');
    this.backslash.nativeElement.classList.add('backslash-fade-out');
  }
}
