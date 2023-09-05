import { Component } from '@angular/core';

import { Note } from './note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  public notes: Array<Note>;

  constructor() {
    this.notes = [
      new Note('First note and this is the biggest title', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note and it is looking very good. Now I can say that it;s looking good'),
      new Note('First note', 'this is my first note'),
      new Note('First note', 'this is my first note'),
      new Note('Second note', 'This is my second note')
    ]
  }
}
