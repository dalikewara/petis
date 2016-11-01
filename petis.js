/**
 *-----------------------------------------------------------------------------
 * Petis is a JavaScript library that designed for (not only) working with DOM.
 *
 * Petis 0.0.1 Z Rev3
 * Licensed under the MIT License
 * Read license.txt or https://opensource.org/licenses/MIT
 *
 * @author   Dali Kewara   <dalikewara@windowslive.com>
 * @return   object        stored as                      window. Petis() or petis()
 */
(function()
{
	// Using strict for global scope
	'use strict';

	// -------------------------- APPLICATION ---------------------------------
	// The following variable contains Petis main object that will be returned.
	// You can see all of Petis can do in DOM through into the object.
	var app = function(doc)
	{
		// Set doc parameter as an document element.
		var str = doc;
		doc = _isString(doc) ? PETIS.get(doc) : doc;

		/**
		 * @var   element   this.get
		 */
		this.get = doc;

		/**
		 * @var   mixed   this.val
		 */
		this.val = (!_isset(doc) || _isNull(doc)) ? document : doc.value;

		/**
		 * @var   string   this.version
		 */
		this.version = PETIS.version;

		/**
		* @param    string            event
		* @param    function          callback
		* @param    bool              useCapture
		* @var      string            str
		* @return   mixed
		*/
		this.on = function(event, callback, useCapture)
		{
			return on(event, str ,callback, useCapture);
		};

		/**
		 * @param     string               tag
		 * @param     object|bool(false)   attribute
		 * @return    mixed
		 */
		this.create = function(tagName, attribute)
		{
			return create(tagName, attribute);
		};

		this.remove = function()
		{
			//
		};

		this.removeAttr = function()
		{
			//
		};

		/**
		 * @param     string          url
		 * @param     null|function   callback
		 * @return    mixed
		 */
		this.load = function(url, callback)
		{
			if(_isUndefined(callback))
			{
				callback = null;
			}

			ajax({
				url: url,
				method: 'GET',
				eventType: 'load',
				target: doc,
				complete: callback
			});
		};

		/**
		 * @param     string               attr
		 * @param     string|bool(false)   setVal
		 * @return    mixed
		 */
		this.attr = function(attr, setVal)
		{
			return attributes(doc, attr, setVal);
		};

		/**
		 * @param     object                                properties
		 * @param     string|document element|bool(false)   target
		 * @return    mixed
		 */
		this.style = function(properties, target)
		{
			styles(doc, properties, target);
		};

		/**
		 * @param     string|document object   element
		 * @return    mixed
		 */
		this.append = function(element)
		{
			add(doc, 'append', element);
		};

		/**
		 * @param     string|document object   element
		 * @return    mixed
		 */
		this.inner = function(element)
		{
			add(doc, 'inner', element);
		};

		/**
		* @return   mixed
		*/
		this.hide = function()
		{
			effects(doc, 'hide');
		};

		/**
		* @return   mixed
		*/
		this.show = function()
		{
			effects(doc, 'show');
		};

		/**
		* @param    object   obj
		* @return   mixed
		*/
		this.dropDown = function(obj)
		{
			features(doc, 'dropdown', obj);
		};

		/**
		* @param    object   obj
		* @return   mixed
		*/
		this.validation = function(obj)
		{
			return validation(doc, obj);
		};

		/**
		* @param    string|bool(false)   selector
		* @return   mixed
		*/
		this.getFormData = function(selector)
		{
			return formData(doc, selector);
		}
	};
	// -------------------------- APPLICATION ---------------------------------




	// ----------------------------- CORE -------------------------------------

	/* Globals */

	var

	// Define Petis's global object for core requirements.
	PETIS = {};

	// Show the current version.
	PETIS.version = '0.0.1 Rev 3';

	// Show the revision number of the current version.
	PETIS.rev = '3';

	// Petis debug mode. Default is 'off'. If you want to using PETIS debug mode,
	// turn it 'on', then you can see logs with custom messages returned if you do wrong while using Petis.
	PETIS.debug = 'off';

	// This for global string properties. Default is set with null string.
	PETIS.str = '';

	// This for global number properties. Default is set with 0.
	PETIS.num = 0;

	// This for global element properties. Default is set with 'document' element.
	PETIS.elem = document;

	// This for global uri properties. Default is set with main hostname.
	PETIS.uri = window.location.href;

	// PETIS.regex contains all regex value for properties requirements.
	PETIS.regex = {
		attribute: {
			value: {
				complete: /[\(][\(][ a-z0-9\=\;\"\'\@\{\}\[\]\<\>\.\,\/\?\:\(\)\%\#\$\*\!\_\+\-]+[\)][\)]/gi,
				left: /[a-z0-9 ]+[\(][\(]|[\(][\(]/gi,
				right: /[\)][\)][a-z0-9 ]+|[\)][\)]/gi,
			},
			separator: /[ ]+[&][&][ ]+|[&][&]|[ ]+[&][&]|[&][&][ ]+/g,
		},
		space: /\s+/g,
		selector: /[:][:][0-9]+|[:][:]/g,
	};

	PETIS.list = {
		attribute: {
			// The orders are sensitive, very important to take care about it.
			fake: ['class'],
			real: ['className'],
		},
		uri: {
			actions: ['split', 'check', 'replace'],
		},
		element: {
			effects: ['show', 'hide'],
			placements: ['inside of', 'force inside of', 'bottom of', 'top of'],
			features: ['toggleDropdown'],
		},
		features: ['validation'],
		form: {
			elemSelector: ['[object HTMLInputElement]', '[object HTMLTextAreaElement]',
				'[object HTMLSelectElement]'],
			specialAttr: ['radio', 'checkbox'],
		}
	};

	/**
	 * @param    bool    rmListener
	 * @return   mixed
	 */
	PETIS.init = function(rmListener)
	{
		var start = function()
		{
			window.Petis = window.petis = function(doc)
			{
				// Doc init for other services in Petis.
				// Petis is a JavaScript library that not only works with DOM.
				// Petis also provide some services such as ajax, uri, file management, etc.
				// When user passed object as parameter into Petis() or petis(), it will calls
				// the services.
				// Example, when user passed ({ajax: true}), than ajax service will be executed.
				if(_isObject(doc))
				{
					if(_isset(doc.debug) && doc.debug === ('on' || 'off' || 'ON' || 'OFF'))
					{
						PETIS.debug = doc.debug;

						return true;
					}
					else if(_isset(doc.clean) && doc.clean === true)
					{
						delete(window.Petis);
						delete(window.petis);

						return true;
					}
					else if(_isset(doc.ajax) && doc.ajax === true)
					{
						ajax(doc);

						return true;
					}
					else if(_isset(doc.uri) && doc.uri === true)
					{
						return true;
					}
					else if(_isset(doc.encode))
					{
						if(_isset(doc.type))
						{
							return PETIS.encode(doc.encode, doc.type);
						}

						return PETIS.encode(doc.encode, 'standart');
					}
				}
				else if(_isFunc(doc))
				{
					document.onreadystatechange = function()
					{
						if(document.readyState == "complete")
						{
							return doc();
						}
					}

					document.addEventListener('interactive', doc, false);
					document.addEventListener('complete', doc, false);
				}

				// When user using default Petis DOM functions.
				return new app(doc);
			};
		};

		if(_isBoolean(rmListener) && rmListener !== false)
		{
			document.removeEventListener('DOMContentLoaded', PETIS.init());
			document.removeEventListener('load', PETIS.init());
			start();
		}
		else
		{
			start();
		}
	};

	/**
	 * @param    string             target
	 * @return   document(object)
	 */
	PETIS.get = function(target)
	{
		var index = _getIndex(target);
		var name = _getName(target, index);

		return (index === '.') ? document.getElementsByClassName(name) :
			((index === '#') ? document.getElementById(name) :
			((index === '@') ? document.getElementsByName(name) :
			document.getElementsByTagName(name)));
	};

	PETIS.encode = function(data, usage)
	{
		if(usage === 'standart')
		{
			if(encodeURIComponent)
			{
				return encodeURIComponent(data);
			}
		}
	}

	/**
	 * @param    object       obj
	 * @param    string       property
	 * @return   mixed|bool   bool(false) on unwanted conditions
	 */
	PETIS.obj = function(obj, property)
	{
		if(_isObject(obj))
		{
			switch(property)
			{
				case 'length':
					if(Object.keys)
					{
						return Object.keys(obj).length;
					}
					else
					{
						var key = 0;
						var length = 0;

						for(key in obj)
						{
							length += Number(obj.hasOwnProperty(key));
						}

						return length;
					}
					break;

				case 'key':
					if(Object.keys)
					{
						return Object.keys(obj);
					}
					else
					{
						var key = 0;
						var keys = [];
						var a = 0

						for(key in obj)
						{
							keys[a] = key;

							a++;
						}

						return keys;
					}
					break;

				case 'value':
					var key = 0;
					var values = [];
					var a = 0;

					for(key in obj)
					{
						values[a] = obj.hasOwnProperty(key) ? obj[key] : null;

						a++;
					}

					return values;
					break;

				default:
					return false;
					break;
			}
		}

		return false;
	};

	/* Branches */

	// We actually prefer to using 'let' than variable syntax bellow. But, 'let' is new in JavaScript,
	// and not all browsers have support for it.
	//
	// @ If you know how to check if browsers support for JavaScript 'let' style, you
	// can contact <dalikewara@windowslive.com> or fork Petis on GitHub/Bitbucket at
	// github.com/dalikewara/petis or bitbucket.org/dalikewara/petis
	var

	_getIndex = function(string){ return string[0];},

	_getName = function(string, index){ return (!index ? string.replace(PETIS.regex.selector, '')
		: string.replace(index, '').replace(PETIS.regex.selector, ''));},

	_getRealAttr = function(index){ return (_issetRealAttr(index) ?
		PETIS.list.attribute.real[PETIS.list.attribute.fake.indexOf(index)] : index);},

	_getError = function(string){ return ((PETIS.debug === 'on') ? string : false);},

	_isString = function(data){ return (Object.prototype.toString.call(data) === '[object String]');},

	_isBoolean = function(data){ return (Object.prototype.toString.call(data) === '[object Boolean]');},

	_isObject = function(data){ return (((Object.prototype.toString.call(data) === '[object Object]'
		&& typeof data === 'object')) ? true : false);},

	_isFunc = function(data){ return (Object.prototype.toString.call(data) === '[object Function]');},

	_isNull = function(data){ return (Object.prototype.toString.call(data) === '[object Null]');},

	_isArray = function(data){ return ((Array.isArray) ? Array.isArray(data) :
		(Object.prototype.toString.call(data) === '[object Array]'));},

	_isHTMLCollection = function(data){ return (Object.prototype.toString.call(data) === '[object HTMLCollection]');},

	_isUndefined = function(data){ return (typeof data === 'undefined') ? true : false;},

	_issetIndex = function(array, index){ return ((array.indexOf(index) < 0) ? false : true);},

	_issetRealAttr = function(index){ return (_issetIndex(PETIS.list.attribute.fake, index) ? true : false);},

	_isset = function(variable){ return ((typeof variable != 'undefined') ? true : false);};

	/* Functions */

	/**
	* On this method/function, all events requested like onclick, onkeyup, and etc,
	* in Petis will handled. Basically, there is no different about event method.
	* In JQuery as example, there are some method you can use (on(), through click(), etc).
	* Petis doesn't implement that. Petis wraps all of that into this 'on()'.
	*
	* @param    string            event
	* @param    string            target
	* @param    function          callback
	* @param    bool              useCapture
	* @return   mixed
	*/
	function on(event, target, callback, useCapture)
	{
		var run = function(e, current, target)
		{
			// This support for most browsers.
			// Petis Uses delegate event to avoid some problems when document doesn't loaded
			// completely.
			//
			// !! Referral from: http://stackoverflow.com/questions/25248286/native-js-equivalent-to-jquery-delegation
			// @ If you found better solution, please contact <dalikewara@windowslive.com>
			// or fork on GitHub/Bitbucket at github.com/dalikewara/petis | bitbucket.org/dalikewara/petis
			var ee = e.target;

			while(ee && ee !== current)
			{
				// Checking Element.matches() browsers compatibility. As we know, not all browsers have support
				// for this method/function implement.
				//
				// !! Referral from: https://developer.mozilla.org/en/docs/Web/API/Element/matches
				// @ If you found better solution, please contact <dalikewara@windowslive.com>
				// or fork on GitHub/Bitbucket at github.com/dalikewara/petis | bitbucket.org/dalikewara/petis
				if(!Element.prototype.matches)
				{
					Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector
						|| Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector ||
						Element.prototype.webkitMatchesSelector || function(e)
						{
							var m = (this.document || this.ownerDocument).querySelectorAll(e),
								i = m.length;

							while(--i >= 0 && m.item(i) !== this){}

							return i > -1;
						};
				}

				if(ee.matches(target))
				{
					callback.call(ee, e);
				}

				ee = ee.parentNode;
			}
		}

		// Checking browser event handler compatibility.
		if(document.addEventListener)
		{
			// Event handler 'addEventListener' is already supported in modern browsers.
			document.addEventListener(event, function(e)
			{
				run(e, this, target);
			}, useCapture);
		}
		else
		{
			// This is an event handler for old browsers like < IE8
			document.attachEvent('on' + event, function(e)
			{
				run(e, this, target);
			}, useCapture);
		}
	}

	/**
	 * When creating an element with Petis, you can set attributes through into
	 * the element by parsing it in the second parameter.
	 * Normally you will create element using this syntax: Petis(document).create('div').
	 * To insert the attributes, just like it: Petis(document).create('div', {id: 'myId', class: 'myClass'})
	 *
	 * @param     string               tagName
	 * @param     object|bool(false)   attribute
	 * @return    mixed|bool
	 */
	function create(tagName, attribute)
	{
		if(_isString(tagName))
		{
			var elem = document.createElement(tagName)

			// If has attribute, insert it through to the element. So, the
			// element will be returned within the attributes.
			if(attribute && _isObject(attribute))
			{
				var len, len2, nm, nm2, val, val2, a, b;

				len =  PETIS.obj(attribute, 'length');
				nm = PETIS.obj(attribute, 'key');
				val = PETIS.obj(attribute, 'value');
				a = 0;

				for( ; a < len; a++)
				{
					// Loops again if the object value is an object too.
					// This usually happens if attribute or object key needs more value like 'style'.
					if(_isObject(val[a]) && nm[a] === 'style')
					{
						len2 =  PETIS.obj(val[a], 'length');
						nm2 = PETIS.obj(val[a], 'key');
						val2 = PETIS.obj(val[a], 'value');
						b = 0;

						for( ; b < len2; b++)
						{
							elem[_getRealAttr(nm[a])][nm2[b]] = val2[b];
						}
					}
					else
					{
						elem[_getRealAttr(nm[a])] = val[a];
					}
				}
			}

			return elem;
		}

		return false;
	};

	/**
	 * You can get element attribute or rewrite it value by using this function/method.
	 * But, if you work in simple, maybe better for you if you use JavaScript native syntax.
	 *
	 * @param     document element     elem
	 * @param     string               attr
	 * @param     string|bool(false)   setVal
	 * @param     string|bool(false)   target
	 * @return    mixed
	 */
	function attributes(elem, attr, setVal, target)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Change or set elem as target if the target is not false.
		if(!_isUndefined(target))
		{
			_isString(target) ? (elem = PETIS.get(target)) : (elem = target);
		}

		// Run main process.
		// If setVal parameter is not false, than Petis will assume that you want to
		// change or rewrite the value of the attribute.
		var run = function(elem)
		{
			if(_isUndefined(setVal))
			{
				// Checking browser compatibility for getAttribute(works on most browsers).
				// Use method 'elem[index]' if browser doesn't support for getAttribute.
				return Element.prototype.getAttribute ? elem.getAttribute(_getRealAttr(attr))
					: elem[_getRealAttr(attr)];
			}

			// If user want to set value to attribute. We check for setAttribute() browsers support
			// first. If the browser doesn't has support for it, to set value into attribute, we use
			// manually with array index.
			Element.prototype.setAttribute ? elem.setAttribute(_getRealAttr(attr), setVal)
			   : (elem[_getRealAttr(attr)] = setVal);
		};

		// Loops for element if comes with HTMLCollection.
		// This usually happend if the element gets from class.
		if(_isHTMLCollection(elem))
		{
			var a = 0;
			var data = [];
			var len = elem.length;

			for( ; a < len; a++)
			{
				data[a] = run(elem[a]);
			}

			return data;
		}
		else
		{
			return run(elem);
		}
	};

	/**
	 * If you want to styling elements using JavaScript, you can use this function/method.
	 * You just have to parse object that contains css attribute into parameter.
	 * The basic syntax is: Petis(myelem).style({background: 'blue', margin: '0'});
	 * But notice that not all css attributes can be parsed here.
	 *
	 * @param     document element                      elem
	 * @param     object                                properties
	 * @param     string|document element|bool(false)   target
	 * @return    mixed
	 */
	function styles(elem, properties, target)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Return errors on unwanted conditions.
		if(!_isObject(properties))
		{
			return _getError('Style properties must be write as an object!');
		}

		// Change or set elem as target if the target is not false.
		if(!_isUndefined(target))
		{
			_isString(target) ? (elem = PETIS.get(target)) : (elem = target);
		}

		// Run main process.
		var run = function(e)
		{
			var len =  PETIS.obj(properties, 'length');
			var nm = PETIS.obj(properties, 'key');
			var val = PETIS.obj(properties, 'value');
			var a = 0;

			for( ; a < len; a++)
			{
				e.style[_getRealAttr(nm[a])] = val[a];
			}
		};

		// Loops for element if comes with HTMLCollection.
		// This usually happend if the element gets from class.
		if(_isHTMLCollection(elem))
		{
			var len = elem.length;
			var a = 0;

			for( ; a < len; a++)
			{
				run(elem[a]);
			}
		}
		else
		{
			run(elem);
		}
	};

	/**
	* This function/method is used to handle add or insert element. There are some
	* methods you can use for your requirements.
	*
	* @param    document element          elem
	* @param    string                    name
	* @return   string|document element   element
	* @return   mixed
	*/
	function add(elem, name, element)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Initialize call object to handle all main functions.
		// This object variable will contains specified functions or methods.
		var call = {};
		/* Part of call object that proceed to append element. */
		call['append'] = function()
		{
			_isString(element) ? elem.appendChild(element)
				: elem.appendChild(element);
		};
		/* Part of call object that proceed to append element using innerHTML method. */
		call['inner'] = function()
		{
			elem.innerHTML = _isString(element) ? element : element.outerHTML;
		};

		// Call the main function based on it name.
		call[name]();
	}

	/**
	* This function/method is used to handle effects of element. There are some
	* effects you can use for your requirements.
	*
	* @param    document element                      elem
	* @param    string                                name
	* @param    string|document element|bool(false)   target
	* @return   mixed
	*/
	function effects(elem, name, target)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Initialize call object to handle all main functions.
		// This object variable will contains specified functions or methods.
		var call = {};
		/* Part of call object that proceed hide effect. */
		call['hide'] = function()
		{
			if(!_isUndefined(target))
			{
				_isString(target) ? (elem = PETIS.get(target)) : (elem = target);
			}

			styles(elem, {display: 'none',visibility: 'hidden'}, elem);
		};
		/* Part of call object that proceed show effect. */
		call['show'] = function()
		{
			if(!_isUndefined(target))
			{
				_isString(target) ? (elem = PETIS.get(target)) : (elem = target);
			}

			styles(elem, {display: 'block',visibility: 'visible'}, elem);
		};

		call[name]();
	}

	/**
	* This function/method is used to handle all custom features you can use to works with element.
	*
	* @param    document element  elem
	* @param    string            name
	* @param    object            obj
	* @return   mixed
	*/
	function features(elem, name, obj)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Initialize call object to handle all main functions.
		// This object variable will contains specified functions or methods.
		var call = {};
		/* Part of call object that proceed dropdown feature. */
		call['dropdown'] = function()
		{
			if(!_isset(obj.toShowed))
			{
				return _getError('You have to add (.toShowed) key and pass an element or element attribute when using (.dropDown)!');
			}

			if(_isString(obj.toShowed))
			{
				obj.toShowed = PETIS.get(obj.toShowed);
			}

			var run = function()
			{
				(obj.toShowed.dataset.toggled ^= 1) ? effects(elem, 'show', obj.toShowed)
					: effects(elem, 'hide', obj.toShowed);
			};

			if(_isset(obj.event) && obj.event != '')
			{
				elem.addEventListener(obj.event, function(){run();});
			}
			else
			{
				run();
			}
		};

		return call[name]();
	}

	/**
	* This function/method is used to handle validations.
	*
	* @param    object   obj
	* @return   mixed
	*/
	function validation(elem, obj)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// When user using validation, the name method must be defined.
		if(!_isset(obj.name))
		{
			return _getError('Validation (.name) is not defined!');
		}

		// Basically, validation method uses current selected document value as index.
		// If user want to specified that, they can add key '.index' into validation's
		// object parameter.
		(_isset(obj.index) && obj.index != '') ? (obj.index = obj.index)
			: (obj.index = elem.value);

		// Initialize call object to handle all main functions.
		// This object variable will contains specified functions or methods.
		var call = {};
		/* Part of call object that proceed length validation. */
		call['length'] = function()
		{
			if(!_isset(obj.max))
			{
				return _getError('You have to set (.max) number in length validation!');
			}

			if(obj.index.length > obj.max)
			{
				if(_isset(obj.onFalse))
				{
					return obj.onFalse();
				}
				else
				{
					return alert('The length value of this input must under ' + obj.max + ' characters!');
				}
			}
		}

		return call[obj.name]();
	}

	/**
	 * @param    document element    elem
	 * @param    string              selector
	 * @return   string
	 */
	function formData(elem, selector)
	{
		// Checking fo elem.
		// If elem is null, we die program and return it false directly.
		if(_isNull(elem))
		{
			return false;
		}

		// Prepared variables
		var a = 0;
		var len = elem.length;

		if(_isUndefined(selector))
		{
			for( ; a < len; a++)
	        {
	            if(!(PETIS.list.form.elemSelector.indexOf(
				Object.prototype.toString.call(elem[a])) < 0))
	            {
	                if(PETIS.list.form.specialAttr.indexOf(elem[a].type) < 0 || (!(
					PETIS.list.form.specialAttr.indexOf(elem[a].type) < 0)
					&& (elem[a].hasAttribute('checked') || elem[a].hasAttribute('selected'))))
	                {
	                    PETIS.str += PETIS.encode(elem[a].name, 'standart') + '=' +
							PETIS.encode(elem[a].value, 'standart') + '&';
	                }
	            }
	        }
		}
		else
		{
			//
		}

		return PETIS.str;
	}

	/**
	 * This will handle AJAX request in Petis.
	 *
	 * @param    object    property
	 * @return   mixed
	 */
	function ajax(property)
	{
		var method = _isset(property.method) ? property.method : 'GET';
		var url = _isset(property.url) ? property.url : false;
		var target = _isset(property.target) ? (_isString(property.target) ?
			PETIS.get(property.target) : property.target) : false;
		var data = _isset(property.data) ? property.data : false;
		var eventType = _isset(property.eventType) ? property.eventType : false;
		var complete = (_isset(property.complete) && _isFunc(property.complete)) ?
			property.complete : false;
		var error = (_isset(property.error) && _isFunc(property.error)) ?
			property.error : false;
		var async = _isset(property.async) ? property.async : true;

		// Initialize XMLHttp object for AJAX.
		if(window.XMLHttpRequest)
		{
			// Support for most modern browsers.
			var xhttp = new XMLHttpRequest();
		}
		else
		{
			// Support for old IE browsers | < IE9
			var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xhttp.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				// The eventType 'load' got from Petis load() function.
				// This used to load an element into another element in document
				// by using AJAX without refresh the current page.
				// Petis uses innerHTML to force append the element.
				if(eventType === 'load')
				{
					if(_isHTMLCollection(target))
					{
						var len = target.length;
						var a = 0;

						for( ; a < len; a++)
						{
							target[a].innerHTML = this.responseText;
						}
					}
					else
					{
						target.innerHTML = this.responseText;
					}
				}

				// Do user defined function (if it exists) when AJAX request was completed.
				if(complete)
				{
					// User can captured AJAX text response by parsing parameter into the function.
					// Example: complete: function(report){}
					// That report parameter will return AJAX text response automatically.
					complete(this.responseText);
				}
			}
			else
			{
				// Do user defined function (if it exists) when AJAX request get errors.
				if(error)
				{
					error(this.responseText);
				}
			}
		};

		xhttp.open(method, url, async);

		// If AJAX method is 'POST', we set new request header with content type
		// application/x-www-form-urlencoded. This may required if user want to
		// send AJAX request from form data.
		(method === 'POST') ? xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') :
			xhttp.setRequestHeader('Content-type', 'text/html');
		xhttp.send(data);
	};
	// ----------------------------- CORE -------------------------------------




	// initer.
	// Petis will start if browser has complete loaded a page.
	// If you found Petis cannot detects element because you create script at the top
	// of the element(before Petis found it first), you can use Petis().start() function
	// to passing a callback and place your scripts inside of it.
	if(document.readyState === 'complete' || document.readyState !== 'loading')
	{
		window.setTimeout(PETIS.init());
	}
	else
	{
		document.addEventListener('DOMContentLoaded', PETIS.init(true));
		window.addEventListener('load', PETIS.init(true));
	}
}());
