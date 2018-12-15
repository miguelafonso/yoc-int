export class Main {
  constructor(private _classToSearch: string) {}

  fillAllElementsWidth(textToWrite: string) {
    const elements = document.getElementsByClassName(this._classToSearch);    

    Object.keys(elements).forEach((key, value) => {
      const paragraph = document.createElement('p');
      paragraph.innerText = textToWrite.repeat(5);
      elements[value].appendChild(paragraph);
    });
  }

}
