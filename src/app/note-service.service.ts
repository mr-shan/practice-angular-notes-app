import { EventEmitter, Injectable } from '@angular/core';

import { Note } from './notes/note.model';
import { NOTE_COLOR_OPTIONS } from './constants';

@Injectable({
  providedIn: 'root',
})
export class NoteServiceService {
  private notes: Array<Note>;

  noteAddedEvent: EventEmitter<Array<Note>>;

  constructor() {
    this.noteAddedEvent = new EventEmitter();
    this.notes = [

    ];
  }

  get(): Note[];
  get(id: string): Note;
  get(id?: string): Note | Note[] | null {
    if (id) {
      return this.notes.find(e => e.id === id) || null;
    }

    return this.notes.slice();
  }

  create(name: string, content: string, shade = NOTE_COLOR_OPTIONS.YELLOW) {
    const newNote = new Note(name, content, shade);
    this.notes.splice(0, 0, newNote);
    this.noteAddedEvent.emit(this.notes.slice());
  }

  edit(id: string, data: any): Note | null {
    const note = this.notes.find(e => e.id === id);
    if (!note) return null;

    note.name = data.name || note.name;
    note.content = data.content || note.content;
    note.shade = data.shade || note.shade;

    this.noteAddedEvent.emit(this.notes.slice());
    return note;
  }

  remove(id: string) {
    const noteToRemove = this.notes.find(e => e.id === id);
    if (!noteToRemove) return;

    const index = this.notes.indexOf(noteToRemove);
    this.notes.splice(index, 1);
    this.noteAddedEvent.emit(this.notes.slice());
  }
}
