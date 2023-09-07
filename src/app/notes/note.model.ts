export class Note {
  id: string;
  name: string;
  content: string;

  constructor(name: string, content: string) {
    this.id = (Date.now().toString() + Math.random()).toString().replace('.', '-')
    this.name = name;
    this.content = content
  }

  toString() {
    return this.name;
  }
}