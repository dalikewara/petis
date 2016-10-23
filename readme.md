[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat)](https://github.com/dalikewara/petis/license.txt)

# Introduction

Petis is an alternative way for you to working with DOM in JavaScript. But actually, and for further, you'll not only get about DOM. Petis can be used in some cases in developing. If you're familiar with JavaScript library like jQuery, Gator, and others, you'll get easy while trying to understanding Petis, because it also similliar with that other JavaScript libraries. Let's we explain to you what's Petis can do: (Read the documentation).

### Log notes (0.0.1 Z Rev3)

- Rewritten Petis's script style.

- Rewritten Petis's syntax feature.

### How to install

- Download Petis first.

- Link petis.js / petis.min.js into your HTML tag script:

  ```html
  <script src="/link/to/your/petis.min.js"></script>
  ```

- And, now you can start using Petis.

        Petis() or petis()

### Documentation

- #### Document ready.
  To use `document ready` in Petis, just do this:

  ```javascript
  Petis(function()
  {
      // Everything you want to do is here...
  });
  ```

  By using that, your script will be executed when the page or document has get ready with it's contents.

- #### Getting element.

  ```javascript
  Petis(selector).get;
  ```

  `selector` can be:

  - `#myId` to get by id.
  - `.myClass` to get by class name.
  - `div` to get by tag name.
  - `my-name` to get by name.


- #### Getting element value.

  ```javascript
  Petis(elem).val;
  ```

  - `elem` can be document element or selector.


- #### Creating element.

  ```javascript
  Petis().create(tagName, attribute);
  ```

  You can set attributes through into created element. Example:

  ```javascript
  Petis().create('div', {
      id: 'myId',
      class: 'myClass',
      style: {
          background: 'blue',
          margin: '0',
      }
  });
  ```

  - `tagName` is a tag name.
  - `attribute` can be null(unset) or object.


- #### Getting element attribute.

  ```javascript
  Petis(elem).attr(attibute);
  ```

  - `elem` can be document element or selector.
  - `attribute` is an attribute name.


- #### About event.
  Petis only implementing one syntax or method for event handler, and that is `on`. Not like jQuery that you can use,

  ```javascript
  $(selector).click(handler);
  ```

  Petis doesn't implements that. The one only supported is the method just like `on` in jQuery or Gator, like this:

  ```javascript
  Petis(elem).on(event, handler, useCapture);
  ```

  - `elem` can be document element or selector.
  - `event` must be document events such as `click`, `mouseover`, `mouseenter`, etc.
  - `handler` can be a function or callback.
  - `useCapture` can be null(unset), true, or false.


- #### Doing AJAX.
  In Petis, AJAX can be done by passing object into `Petis function's` parameter with `ajax: true`.

  ```javascript
  Petis(
  {
      ajax: true,
      url: url,
      method: method,
      data: data,
      complete: handler,
      error: handler,
  });
  ```

  - `handler` can be a null(unset), function, or callback.


- #### Getting form data.
  You can simply getting form data by using this:

  ```javascript
  Petis(form).getFormData();
  ```

  That is similliar (but not same) to `serialize()` in jQuery.

  - `form` can be document(form) element or form selector.


- #### Load element.
  Basically, loading an element from external source is using AJAX and simple `innerHTML` method.
  Petis also implements this technique, but the AJAX was created automatically by system. You just need to
  specify parent element and the source url.

  ```javascript
  Petis(elem).load(url, handler);
  ```

  - `elem` can be document element or selector.
  - `handler` can be a null(unset), function, or callback.


- #### Inserting element.
  There are two options to insert an element inside an element in Petis.

  ```javascript
  Petis(elem).append(elem2);
  Petis(elem).inner(elem2);
  ```

  - `elem` can be document element or selector.


- #### Styling.
  You can directly style element with Petis by using this:

  ```javascript
  Petis(elem).style(
  {
      background: 'blue',
      margin: '0',
      // ...
  });
  ```

   But, not all CSS attributes can be passed. We'll fix this as soon as possible.

  - `elem` can be document element or selector.


- #### Effects.
  Petis provides some effects that you can use.

  ```javascript
  Petis(elem).hide();
  Petis(elem).show();
  ```

  - `elem` can be document element or selector.


- #### Creating dropdown.
  With Petis, creating a simple dropdown can be done easily. Here's the example:

  ```javascript
  Petis(elem).dropDown(
  {
      event: event,
      toShowed: target,
  });
  ```

  The example explains, when the event triggers on `elem`, then the target element will be showed.

  - `elem` and `target` can be document element or selector.
  - `event` must be document events such as `click`, `mouseover`, `mouseenter`, etc.


- #### Data encoding.

  ```javascript
  Petis({encode: data});
  ```

  - `data` must be a string;


- #### Petis debug mode.
  Debug mode is `off` by default. You can turn it on with:

  ```javascript
  Petis({debug: 'on'});
  ```

  When you using debug mode, you will see more custom log message if you do wrong while working with Petis.
  But, don't forget to turn off this when you have finished.


- #### Clean all Petis global variables.
  Petis store it function on window object. If you access `Petis()`, you actually just access `window.Petis()`. You can delete this global variable after you are done with Petis.

  ```javascript
  Petis({clean: true});
  ```


### Author

[Dali Kewara](https://dalikewara.com) | [<dalikewara@windowslive.com>](mailto:dalikewara@windowslice.com)

### License

[Petis](https://dalikewara.com/project/petis) is an open-sourced JavaScript library licensed under the [MIT license](https://opensource.org/licenses/MIT).
