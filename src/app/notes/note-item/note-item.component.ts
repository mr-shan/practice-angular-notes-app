import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

import { Note } from '../note.model';
import { NoteServiceService } from 'src/app/note-service.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent implements OnInit {
  @ViewChild('containerRef') containerRef: ElementRef;
  @ViewChild('backslash') backslashRef: ElementRef;
  @Input('data') data: Note = {} as Note;
  @Output('openNote') openNote = {} as EventEmitter<string>;

  name: string;
  content: string;
  shade: string;

  isOpen: boolean;

  constructor(private noteService: NoteServiceService) {
    this.openNote = new EventEmitter();
    this.containerRef = {} as ElementRef;
    this.backslashRef = {} as ElementRef;
    this.isOpen = false;

    this.name = '';
    this.content = '';
    this.shade = '';
  }

  ngOnInit(): void {
    this.name = this.data.name;
    this.content = this.data.content;
    this.shade = this.data.shade;
  }

  onNoteClick() {
    if (this.isOpen) return;
    this.setBeforeExpandPositions();

    setTimeout(() => {
      this.containerRef.nativeElement.classList.add('expand-note');
      this.containerRef.nativeElement.classList.add('test-expand-note');
      this.isOpen = true;
    }, 50);
    
    // this.openNote.emit(this.data.id);
  }

  onSaveNote() {
    if (!(this.name && this.content)) return;

    this.noteService.edit(this.data.id, {
      name: this.name,
      content: this.content,
      shade: this.shade
    })

    this.onCloseNote();
  }

  onCloseNote() {
    this.containerRef.nativeElement.classList.remove('test-expand-note');
    this.backslashRef.nativeElement.classList.add('fade-out-animation');
    setTimeout(() => {
      this.containerRef.nativeElement.classList.remove('expand-note');
      this.resetContainerPositions();
      this.backslashRef.nativeElement.classList.remove('fade-out-animation');      
      this.isOpen = false;
    }, 250);
  }

  onDeleteNote() {
    this.containerRef.nativeElement.classList.add('note-remove-animation');
    setTimeout(() => {
      this.noteService.remove(this.data.id);
    }, 250)
  }

  setBeforeExpandPositions() {
    const box = this.containerRef.nativeElement.getBoundingClientRect();
    this.containerRef.nativeElement.style.width = box.width + 'px';
    this.containerRef.nativeElement.style.height = box.height + 'px';
    this.containerRef.nativeElement.style.left = box.left + 'px';
    this.containerRef.nativeElement.style.right = box.right + 'px';
    this.containerRef.nativeElement.style.top = box.top + 'px';
  }

  resetContainerPositions() {
    this.containerRef.nativeElement.style.width = '';
    this.containerRef.nativeElement.style.height = '';
    this.containerRef.nativeElement.style.left = '';
    this.containerRef.nativeElement.style.right = '';
    this.containerRef.nativeElement.style.top = '';
  }
}
