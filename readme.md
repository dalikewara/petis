# Introduction

Petis is a way to play DOM elements in JavaScript that come with ease.

### How To Install

- Download Petis first.

- Link petis.js / petis.min.js to your HTML tag script. Example: script src="petis.min.js"

- Now you can use Petis by calling app(). Example: var app = app();

### Features (0.0.1 Z Rev 1)

- Getting DOM object element: app.get.element('#myId'); you can parse array into parameter to get multiple elements: app.get.element(['#myFirstId', '.myClass', '#mySecondId']); (Rev1)

- Creating DOM object element: app.create.element('div'); you can create element with parsing content and some attributes: app.create.element('div::with::id((myId)) && style((background:blue;margin:0))', 'This is my content'); (Rev1)

### Author

[Dali Kewara](http://dalikewara.com) | [<dalikewara@windowslive.com>](mailto:dalikewara@windowslice.com)

### License

[Petis](http://dalikewara.com/project/petis) is an open-sourced script(JavaScript) licensed under the [MIT license](http://opensource.org/licenses/MIT).
