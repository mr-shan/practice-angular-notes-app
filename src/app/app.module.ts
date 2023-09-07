import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { NotesComponent } from './notes/notes.component';
import { NoteItemComponent } from './notes/note-item/note-item.component';
import { HeaderComponent } from './header/header.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { ColorPickerComponent } from './new-note/color-picker/color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteItemComponent,
    HeaderComponent,
    NewNoteComponent,
    ColorPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
