import { Main } from '../src/scripts/main';

describe('Greeter', () => {
  let mainClass: Main;
  let randomText: any;
  let videoElement: any;
  let body: any;

  beforeAll(() => { 
    body = document.getElementsByTagName("body")[0];
    randomText = document.createElement('div');
    randomText.classList.add("testing");
    randomText.setAttribute("id", "dummyText");

    videoElement = document.createElement('div');
    videoElement.innerHTML = '<video preload class="video-airbnb"><source src="video.mp4" class="video-src" type="video/mp4"></video>';
    body.appendChild(randomText);
    body.appendChild(videoElement);
  });

  beforeEach(() => {
    mainClass = new Main('testing');
  });

  it('fillAllElementsWidth', () => {
    mainClass.fillAllElementsWidth("testTEXT");
    const t = document.getElementById("dummyText");
    expect(t!.innerHTML).toEqual("<p>" + "testTEXT".repeat(5) + "</p>");
  });

  it('getPositionFromTop', () => {
    mainClass.fillAllElementsWidth("testTEXT");
    const t = document.getElementById("dummyText");
    expect(t!.innerHTML).toEqual("<p>" + "testTEXT".repeat(5) + "</p>");
  });
});
