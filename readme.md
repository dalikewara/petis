# Introduction

Petis is an alternate way to working DOM in JavaScript that come with ease. But actually you will not only get about DOM, Petis can used by some cases in development.

### How To Install

- Download Petis first.

- Link petis.js / petis.min.js to your HTML tag script:

      <script src="petis.min.js"></script>

- Now you can use Petis by calling global Petis().

      var app = new Petis();

  We always recommend to store Petis() as a variable, because after Petis was declared, it's global scope will be deleted.

- Console.log the variable to see the object and all of Petis can do.

### Features (0.0.1 Z Rev 2)

- Getting DOM elements:

      app.get.element('#myId');

  you can parse array into parameter to get multiple elements:

      app.get.element(['#myFirstId', '.myClass', '#mySecondId']);

  This is more get.element references:
  * '#myId' to get element by id.
  * '.myClass' to get elements by class name.
  * '@myName' to get elements by name.
  * 'tagName' to get elements by tag name.
  * '.myClass::1' to get elements by class name with number of index is 1. This syntax '::Number' can be used to all selectors.


- Getting uri:

      app.get.uri();

  You can parse actions into parameters:

      app.get.uri({split: '/'});

      or

      app.get.uri({
          replace: ['http://', 'www'],
          split: '.com'
      });

  This is more get.uri action references:
  * replace: [value, to] (string)
  * split: value (array)
  * check: value (true|false)


- Creating DOM element:

      app.create.element('div');

  You can create element with parsing content and some attributes:

      app.create.element('div', {
          id: 'myId',
          class: 'myClass',
          content: '<p>This is content</p>',
          style: {
              background: 'blue',
              margin: 0
          }
      });

      // equivalen to
      <div id="myId" class="myClass" style="background: blue; margin: 0">
          <p>This is content</p>
      </div>

  You can also parse array into parameters to create multiple elements and attributes:

      app.create.element(arrayTag, arrayAttribute);

      or

      app.create.element(arrayTag, attribute);


- Setting DOM attribute:

      var elem = app.get.element('#myId');

      app.set.attribute(elem, {
          id: 'myId',
          class: 'myClass',
          style: {
              background: 'blue',
              margin: 0
          }
      });

      or

      app.set.attribute('#myId', {
          id: 'myId',
          class: 'myClass',
          style: {
              background: 'blue',
              margin: 0
          }
      });

  You can also parse array into parameters to set multiple elements and attributes:

      app.set.attribute(arrayElement, arrayAttribute);

      or

      app.set.attribute(arrayElement, attribute);


### Author

[Dali Kewara](https://dalikewara.com) | [<dalikewara@windowslive.com>](mailto:dalikewara@windowslice.com)

### License

[Petis](https://dalikewara.com/project/petis) is an open-sourced JavaScript library/object licensed under the [MIT license](https://opensource.org/licenses/MIT).
