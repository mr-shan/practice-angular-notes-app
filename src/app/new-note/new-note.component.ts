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
import { NoteServiceService } from '../note-service.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css'],
})
export class NewNoteComponent implements OnInit {
  @ViewChild('mainBody', { static: false }) mainBody = {} as ElementRef;
  @ViewChild('backslash', { static: false }) backslash = {} as ElementRef;

  @Input('noteId') noteId: string;

  @Output('closeDialog') closeDialog: EventEmitter<null>;

  name: string;
  content: string;
  shade: string;
  mode: string = 'new';
  colorOptions: Array<string>;

  constructor(private noteService: NoteServiceService) {
    this.closeDialog = new EventEmitter();
    this.colorOptions = Object.keys(NOTE_COLOR_OPTIONS);

    this.name = '';
    this.content = '';
    this.shade = NOTE_COLOR_OPTIONS.YELLOW;
    this.noteId = '';
  }

  ngOnInit(): void {
    if (this.noteId) {
      const data = this.noteService.get(this.noteId)
      if (!data) this.onCancel();
      this.name = data.name;
      this.content = data.content;
      this.mode = 'edit';
      this.shade = data.shade;
    }
  }

  onSaveNote() {
    if (!(this.name && this.content)) return;

    this.setClosingAnimations();

    setTimeout(() => {
      if (this.mode === 'new') {
        this.noteService.create(this.name, this.content, this.shade)
      } else {
        if (this.noteId)
          this.noteService.edit(this.noteId, {
            name: this.name,
            content: this.content,
            shade: this.shade,
          })
      }

      this.resetNoteDetails();
      this.closeDialog.emit();
    }, 250);

    if (this.mode === 'new') {
      window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
    }
  }

  onCancel() {
    this.setClosingAnimations();
    setTimeout(() => {
      this.closeDialog.emit();
      this.resetNoteDetails();
    }, 250);
  }

  onColorChange(event: any) {
    this.shade = NOTE_COLOR_OPTIONS[event];
  }

  setClosingAnimations() {
    this.mainBody.nativeElement.classList.add('main-body-pop-out');
    this.backslash.nativeElement.classList.add('backslash-fade-out');
  }

  resetNoteDetails() {
    this.name = '';
    this.content = ''
    this.shade = NOTE_COLOR_OPTIONS.YELLOW;
  }
}
