import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Note } from './note.model';
import { NoteServiceService } from '../note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {
  notes: Note[];
  openNoteId: string;

  constructor(private noteService: NoteServiceService) {
    this.notes = [];
    this.openNoteId = '';
  }

  ngOnInit(): void {
    this.notes = this.noteService.get();
    this.noteService.noteAddedEvent.subscribe(
      (event: Array<Note>) => this.notes = event
    )
  }

  onOpenNote(noteId: string) {
    this.openNoteId = noteId;
  }

  closeNoteDialog() {
    this.openNoteId = '';
  }
}
