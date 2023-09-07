import { NOTE_COLOR_OPTIONS } from '../constants';

export class Note {
  id: string;
  name: string;
  content: string;
  shade: string;

  constructor(name: string, content: string, shade=NOTE_COLOR_OPTIONS.YELLOW) {
    this.id = (Date.now().toString() + Math.random()).toString().replace('.', '-')
    this.name = name;
    this.content = content
    this.shade = shade;
  }

  toString() {
    return this.name;
  }
}