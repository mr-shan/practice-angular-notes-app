import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { Note } from '../note.model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css'],
})
export class NoteItemComponent {
  @ViewChild('containerRef') containerRef: ElementRef;
  @ViewChild('backslash') backslashRef: ElementRef;
  @Input('data') data: Note = {} as Note;
  @Output('openNote') openNote = {} as EventEmitter<string>;

  isOpen: boolean;

  constructor() {
    this.openNote = new EventEmitter();
    this.containerRef = {} as ElementRef;
    this.backslashRef = {} as ElementRef;
    this.isOpen = false;
  }

  onNoteClick() {
    if (this.isOpen) return;
    this.setBeforeExpandPositions();

    setTimeout(() => {
      this.containerRef.nativeElement.classList.add('expand-note');
      this.containerRef.nativeElement.classList.add('test-expand-note');
      this.isOpen = true;
    }, 50);
    
    this.openNote.emit(this.data.id);
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
