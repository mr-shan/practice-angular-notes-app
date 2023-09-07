import { Component } from '@angular/core';

import { Note } from './notes/note.model';
import { NOTE_COLOR_OPTIONS } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  showNewNoteDialog: boolean;
  notes: Array<Note>;
  noteData: Note | null;

  constructor() {
    this.showNewNoteDialog = false;
    this.noteData = null;
    this.notes = [
      new Note('First note and this is the biggest title', 'this is my first note', NOTE_COLOR_OPTIONS.BLUE),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.GREEN),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PINK),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PURPLE),
      new Note('First note', 'this is my first note and it is looking very good. Now I can say that it;s looking good', NOTE_COLOR_OPTIONS.YELLOW),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PURPLE),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PINK),
      new Note('Second note', 'This is my second note', NOTE_COLOR_OPTIONS.GREEN)
    ]
  }

  onSaveNote(event: any) {
    if (event.mode === 'new') {
      const newNote = new Note(event.name, event.content, event.shade);
      this.notes.push(newNote);
      if (event.mode === 'new') {
        window.scroll({
          top: document.body.scrollHeight, 
          left: 0, 
          behavior: 'smooth' 
        });
      }
    } else if (event.mode === 'edit' && event.id) {
      const existingNote = this.notes.find(e => e.id === event.id)
      if (existingNote) {
        existingNote.content = event.content;
        existingNote.name = event.name;
        existingNote.shade = event.shade
      }
    }
    this.closeNewNoteDialog();
  }

  onOpenExistingNote(event: string) {
    const data = this.notes.find(e => e.id === event);
    if (!data) return;

    this.noteData = data;
    this.showNewNoteDialog = true;
  }

  openNewNoteDialog() {
    this.showNewNoteDialog = true;
  }

  closeNewNoteDialog() {
    this.showNewNoteDialog = false;
  }
}
