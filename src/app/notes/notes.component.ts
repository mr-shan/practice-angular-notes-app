import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Note } from './note.model';
import { NoteServiceService } from '../note-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  showNewNoteDialog: boolean;
  openNoteId: string;

  constructor(private noteService: NoteServiceService) {
    this.notes = [];
    this.showNewNoteDialog = false;
    this.openNoteId = '';
  }

  ngOnInit(): void {
    this.notes = this.noteService.get();
  }

  onOpenNote(noteId: string) {
    this.showNewNoteDialog = true;
    this.openNoteId = noteId;
  }

  closeNoteDialog() {
    this.showNewNoteDialog = false;
    this.openNoteId = '';
  }
}
