# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Ben Macaro

Time spent: 19 hours spent in total

Link to project: https://glitch.com/edit/#!/periodic-wave-mustang

## Required Functionality

The following **required** functionality is complete:

* [🗸] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [🗸] "Start" button toggles between "Start" and "Stop" when clicked. 
* [🗸] Game buttons each light up and play a sound when clicked. 
* [🗸] Computer plays back sequence of clues including sound and visual cue for each button
* [🗸] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [🗸] User wins the game after guessing a complete pattern
* [🗸] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [🗸] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [🗸] Buttons use a pitch (frequency) other than the ones in the tutorial
* [🗸] More than 4 functional game buttons
* [🗸] Playback speeds up on each turn
* [🗸] Computer picks a different pattern each time the game is played
* [🗸] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [🗸] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [🗸] Player / computer turn is shown
- [🗸] Player must wait for the computer to finish playing before their input is accepted
- [🗸] Number of mistakes and progress are shown
- [🗸] Player can adjust the number of rounds, set how much time to guess on each turn, turn the timer on or off, and set the volume 

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](http://g.recordit.co/8IcDTpubi7.gif)
![](http://g.recordit.co/b9LMBR9ehx.gif)
![](http://g.recordit.co/2zTRmfDlUw.gif)



## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
- W3 Schools: for HTML and CSS styling
- MDN Web Docs & Stack Overflow: for understanding setTimeout() and setInterval() functionality
- www.svgbackgrounds.com: for SVG background 

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)  

A challenge I encountered in creating this submission was implementing the limited guess time feature. This was because I had trouble understanding how callback functions are queued with the setTimeout and setInterval functions. Initially, I thought about implementing the timer through asynchrounous functions. This led me to reading about callbacks, promises, and the async / await keywords.  

However, I realized to implement this functionality asynchronously using these specific Javascript language features, I'd have to rewrite certain functions. I wasn't willing to do this considering the time constraints in completing this project before the deadline. How I was able to implement the timer was by using both the setInterval() and setTimeout() functions.  
Each time the user clicks a button, it's checked if:
 - A game is in progress
 - It's the user's turn
 - The sequence to repeat back is longer than 1
 - The timer is enabled through the settings  
  
If all these checks are true, then the timer function is called. A target time is set in the future a certain amount of seconds according to the user's settings. In the timer function, the setInterval() function is called and calls its callback function each millisecond. In the callback function, the time difference between the current time and the target time is checked. If the difference is 0, that means the time is up, and a global flag is updated.   

The setTimeout() function's callback function will check after the target time to see if the global flag was updated. If the flag is true, this meant the user did not repeat the sequence in time. If it wasn't, the user did repeat it back in time.

The interval is cleared if:
 - The sequence is repeated before the time difference between the target and current time is 0
 - The difference between the target and current is 0
 - The user stops the game
 - The user wins

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)  

This project has shown me that even a small scale static web app like this can grow in complexity as more features are added. My questions include, what are some best practices in working as a team to ensure the readability and understanding of a codebase as a project's functionality grows? How can projects like this be translated / refactored into using modern front end frameworks like ReactJS/AngularJS, etc? How can a team divide the work amongst each other to reach an objective like that, or to implement other complex features?


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)  

If I had a few more hours to work on this project, I'd want to:
 - Refactor the HTML, CSS, and Javascript files to allow the ability to redesign certain components and add in features
   - Create a 'style guide' to ensure a consistent style 
 - Add an "endless mode" and some sort of high-scores leaderboard
   - Link this leaderboard to a database to store the scores



## License

    Copyright Benedikt Macaro

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.