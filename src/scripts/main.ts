export class Main {

  private videoConfiguration = Object.freeze(
    {
      playStopAt: 0.5,
      inVidScrollLock: false
    }
  );

  // flag to control if user is scrolling between video being visible and the 50% required for playing
  private inVidScrollLock = false;
  private minimumVideoVisibilityPx: number = 0;
  private videoPlayingAsyncFlag: boolean = false;
  private videPlayingConfig = {duration: 0, currentTime: 0};

  constructor(private _classToSearch: string) {}


  /**
   * generic implementation of debounce
   */
  debounce = (fn: any, time: number = 1000) => {
    const self = this;
    let timeout: number;
  
    return () => {
      const functionCall = function () { return fn.apply(self, arguments)};
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }


  fillAllElementsWidth(textToWrite: string) {
    const elements = document.getElementsByClassName(this._classToSearch);
    Object.keys(elements).forEach((key, value) => {
      const paragraph = document.createElement('p');
      paragraph.innerText = textToWrite.repeat(5);
      elements[value].appendChild(paragraph);
    });
  }

  getPositionFromTop(element: any) {
    let xPosition: number = 0;
    let yPosition: number = 0;

    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return {xPosition, yPosition};
  }

  getElementVisibilityData(elementClassName: string) {
      const element = document.getElementsByClassName(elementClassName)[0];
      const {height, top, bottom} = element.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const above = bottom < 0;
      const below = top - viewHeight >= 0;

      return {
        visible: !above && !below,
        height,
        top
      }
    }

    initVideoAddControl () {

      window.addEventListener('scroll', this.debounce(() => {
        const a = document.getElementsByClassName("video-airbnb")[0];
        const {visible, height, top} = this.getElementVisibilityData("video-airbnb");
        const videoElement = document.querySelector('video');
        const heightToPlay = this.videoConfiguration.playStopAt;
        const videoHeightTopBottomPlayPx= height * heightToPlay;
        
        if (visible && !this.inVidScrollLock) {      
          if (!this.minimumVideoVisibilityPx) {
            this.minimumVideoVisibilityPx = Math.round(top - videoHeightTopBottomPlayPx);
          }

          if (top <= this.minimumVideoVisibilityPx && !this.isVideoPlaying(videoElement)) {
            if (!this.videoPlayingAsyncFlag) {
              const playPromise = videoElement!.play();
              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  this.videoPlayingAsyncFlag = true;
                  this.videPlayingConfig.duration = Math.round(videoElement!.duration);
                
                  // calculate percentage in seconds according to duration
                  const percentage25 = Math.round(this.videPlayingConfig.duration * 0.25);
                  const percentage50 = Math.round(this.videPlayingConfig.duration * 0.50);
                  const percentage75 = Math.round(this.videPlayingConfig.duration * 0.75);
                  const percentage100 = this.videPlayingConfig.duration;

                  const percentageOutput = setInterval(() => {
                    // current time of the video
                    const cTime = Math.round(videoElement!.currentTime);

                    switch (cTime) {
                      case percentage25:
                        console.log("Video Percentage @ 25%");
                        break;
                      case percentage50:
                        console.log("Video Percentage @ 50%");
                        break;
                      case percentage75:
                        console.log("Video Percentage @ 75%");
                        break;
                      case percentage100:
                        console.log("Video Percentage @ 100%");
                        clearInterval(percentageOutput);
                        break;
                    }
                  }, 1000);
                })
                .catch(error => {
                  throw new Error(`Error ${error}` + error.message.includes("interact with the") ? "Must interact with page! https://goo.gl/xX8pDD" : "");
                });
              }
            }

            this.inVidScrollLock = true;
          } else {
            if (top < 0 && top <= videoHeightTopBottomPlayPx * -1) {
              const playPromise = videoElement!.play();
              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  if (this.isVideoPlaying(videoElement)) {
                    this.videoPlayingAsyncFlag = false;
                    videoElement!.pause();
                  }
                })
                .catch(error => {
                  throw new Error(`Error ${error}` + error.message.includes("interact with the") ? "Must interact with page! https://goo.gl/xX8pDD" : "");
                });
              }
            }
          }
        
        } else {
          this.inVidScrollLock = false;
          if (!visible && this.isVideoPlaying(videoElement)) {
              const playPromise = videoElement!.play();
              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  if (this.isVideoPlaying(videoElement)) {
                    this.videoPlayingAsyncFlag = false;
                    videoElement!.pause();
                  }
                })
                .catch(error => {
                  throw new Error(`Error ${error}` + error.message.includes("interact with the") ? "Must interact with page! https://goo.gl/xX8pDD" : "");
                });
              }
            }
        }
      }, 500));
    }

    private isVideoPlaying (videoElement: any) {
      return videoElement!.currentTime > 0 && !videoElement!.paused && !videoElement!.ended && videoElement!.readyState > 2;
    }
    
}
