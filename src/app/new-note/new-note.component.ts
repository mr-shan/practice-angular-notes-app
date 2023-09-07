import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';

import { Note } from '../notes/note.model';

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
  mode: string = 'new'

  constructor() {
    this.saveNoteEvent = new EventEmitter();
    this.cancelEvent = new EventEmitter();

    this.name = '';
    this.content = '';
  }

  ngOnInit(): void {
    if (this.data) {
      this.name = this.data.name;
      this.content = this.data.content;
      this.mode = 'edit';
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
        id: this.data?.id || null
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

  setClosingAnimations() {
    this.mainBody.nativeElement.classList.add('main-body-pop-out');
    this.backslash.nativeElement.classList.add('backslash-fade-out');
  }
}
