# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Anagh Kanungo**

Time spent: **5** hours spent in total

Link to project: [Glitch Project Link](https://glitch.com/edit/#!/expensive-chartreuse-sardine?path=README.md%3A7%3A15)
Playable Link

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [X] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [X] Added a scoreboard
- [X] Ability to save and fetch high score to browser cookies
- [X] Typewriter heading text

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](gif1-link-here)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- Functions for Cookies: https://www.w3schools.com/js/js_cookies.asp

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
While creating this website, I encountered three main problems. I will discuss them in detail. 
- The first problem I encountered was with generating sound on the webpage. Since I've not worked with generating audio in Javascript before, it took some time for me to figure out how the function was working and how it was generating audio. Initially, I could not hear a different audio on all of the buttons, which I resolved by fixing a typo in my code. 
- The second problem was related to generating a random pattern, which was one of the optional exercises. To make the game more interesting, I decided to create a function that would generate a random pattern every time the page was loaded. Although I've worked with Math.random() before, it was interesting to try and figure out a way to generate numbers within a specific range and I figured it out in the end by using Math.floor and an array to pick elements from. I'm sure there's a more optimized way to do this, but for now this worked well.
- The third problem was related to saving the high score of the game for the user. Since we don't really have a back-end server setup, the easiest way to setup data persistence was to use browser cookies. We could have also used sessions, but that would reset after every browsing session, something I didn't want. I knew about the document.cookies object but I had to look it up on W3Schools and used their functions as they seemed to do exactly what I wanted. 


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
This project was an interesting experience for me and a way to practice some of the web development skills that I've learnt over the years, as well as working with Glitch for the first time, which was a really good experience as well. 
Completing this has raised some interesting questions about web development, and I hope I can learn more when I attend the SITE internship program. 
- How can we make this website mobile responsive, so that it works well on all orientations. Specifically, on mobile maybe we could have smaller buttons and elements?
- How can we create a variety of sounds natively in Javascript, and use them in our game? It is great that we can generate sound using just code without any external libraries. I wonder what types of sounds we can generate, and how these are used in real-life applications.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
If I had more time and resources to devote to this project, here are the features I would like to implement:
- Setup a backend in this game, which people can sign-in. It also auto-generates a new pattern every 24 hours for people to play.
- People can log their high scores on a leaderboard which resets every 24 hours and can get featured there. This would help create a community around this game, like the popular game Wordle. 
- Maybe add a function to increase the number of buttons as the difficulty level increases. This would require some modifications to ensure that buttons stay hidden until a certain level, and also that the pattern is valid at all times for the buttons that are shown. 
- Definitely add different sound effects to the game.
- Add a running clock to the game, which also speeds up with every passing level. 
- Make the buttons move on higher levels, making it even harder for the player to click as they keep moving around randomly in a box.


## Interview Recording URL Link

[My 5-minute Interview Recording](https://youtu.be/8A9__MIn1IY)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.