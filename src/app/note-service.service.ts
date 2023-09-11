import { Injectable } from '@angular/core';

import { Note } from './notes/note.model';
import { NOTE_COLOR_OPTIONS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  notes: Array<Note>;
  noteDialog: boolean;

  constructor() {
    this.noteDialog = false;
    this.notes = [
      new Note(
        'First note and this is the biggest title',
        'this is my first note',
        NOTE_COLOR_OPTIONS.BLUE
      ),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.GREEN),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PINK),
      new Note(
        'First note',
        'this is my first note',
        NOTE_COLOR_OPTIONS.PURPLE
      ),
      new Note(
        'First note',
        'this is my first note and it is looking very good. Now I can say that it;s looking good',
        NOTE_COLOR_OPTIONS.YELLOW
      ),
      new Note(
        'First note',
        'this is my first note',
        NOTE_COLOR_OPTIONS.PURPLE
      ),
      new Note('First note', 'this is my first note', NOTE_COLOR_OPTIONS.PINK),
      new Note(
        'Second note',
        'This is my second note',
        NOTE_COLOR_OPTIONS.GREEN
      ),
    ];
  }

  get(): Note[];
  get(id: string): Note;
  get(id?: string): Note | Note[] | null {
    if (id) {
      return this.notes.find(e => e.id === id) || null;
    }

    return this.notes;
  }

  create(name: string, content: string, shade = NOTE_COLOR_OPTIONS.YELLOW) {
    const newNote = new Note(name, content, shade);
    this.notes.splice(0, 0, newNote);
  }

  edit(id: string, data: any): Note | null {
    const note = this.notes.find(e => e.id === id);
    if (!note) return null;

    note.name = data.name || note.name;
    note.content = data.content || note.content;
    note.shade = data.shade || note.shade;

    return note;
  }

  remove(id: string) {
    this.notes = this.notes.filter(e => e.id !== id)
  }

  openNoteDialog(id?: string) {
    this.noteDialog = true;
  }
}
