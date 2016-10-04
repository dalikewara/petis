/**
 ******************************************************************************
 * The app() function is the main of Petis. The function returned value as an 
 * object with some keys function that will be used for DOM development or even 
 * some other cases. You will play the DOM with that keys.
 *
 *
 * @return   object
 *
 */
function app()
{	
	return {
		
		/*
		 * All jobs on 'get' key. 
		 * 
		 * Available(2): element(string|array), uri
		 */
		get: {
			
			/**
			 * @param    string|array   data
			 * @return   object|bool
			 */
			element: function(data)
			{
				var dataIndex, dataName, dataType, dataLength, dataResult;

				dataType = data.constructor;
	
				if(dataType === String)
				{
					dataIndex = data[0];
					dataName = data.replace(dataIndex, '');
		
					return (dataIndex === '.') ? document.getElementsByClassName(dataName)
						: document.getElementById(dataName);
				}
				else if(dataType === Array)
				{
					dataLength = data.length;
					dataResult = [];
		
					for(a = 0; a < dataLength; a++)
					{
						dataIndex = data[a][0];
						dataName = data[a].replace(dataIndex, '');
			
						dataResult[data[a]] = (dataIndex === '.') ? document.getElementsByClassName(dataName) 
							: document.getElementById(dataName);
					}
		
					return dataResult;
				}
			
				return false;
			},
			
			/**
			 * @output   string
			 */
			uri: window.location.href,
		},
		
		/*
		 * All jobs on 'create' key. 
		 * 
		 * Available(1): element(string)
		 */
		create: {
			
			/**
			 * @param    string|array   tag
			 * @param    string|bool    content
			 * @return   object|bool
			 */
			element: function(tag, content = false)
			{
				var tagName, tagAttribute, tagType, tagSeparator1, tagSeparator2, 
					tagSeparator3, tagSeparator4, tagSeparator5, tagSeparator6, 
					tagComponents, element, tagAttrLength, tagAttrIndex, tagAttrValue, 
					tagAttrArray, tagAttrStyleAttr, tagAttrStyleValue, tagAttrStyleIndex, 
					tagAttrStyleLength, tagAttrStyleArray;
				
				tagType = tag.constructor;
				tagSeparator1 = '::with::';
				tagSeparator2 = '&&';
				tagSeparator3 = '((';
				tagSeparator4 = '))';
				tagSeparator5 = ';';
				tagSeparator6 = ':';
				
				if(tagType === String)
				{
					tagComponents = tag.split(tagSeparator1);
					tagName = tagComponents[0];
					tagAttribute = tagComponents[1].split(tagSeparator2);
					tagAttrLength = tagAttribute.length;
					element = document.createElement(tagName);
					
					if(tagAttrLength > 0)
					{
						for(a = 0; a < tagAttrLength; a++)
						{
							tagAttrArray = tagAttribute[a].split(tagSeparator3);
							tagAttrIndex = tagAttrArray[0].trim();
							tagAttrValue = tagAttrArray[1].replace(tagSeparator4, '').trim();
							
							if(tagAttrIndex === 'style')
							{
								tagAttrStyleAttr = tagAttrValue.split(tagSeparator5);
								tagAttrStyleLength = tagAttrStyleAttr.length;
								
								for(b = 0; b < tagAttrStyleLength; b++)
								{
									tagAttrStyleArray = tagAttrStyleAttr[b].split(tagSeparator6);
									tagAttrStyleIndex = tagAttrStyleArray[0].trim();
									tagAttrStyleValue = tagAttrStyleArray[1].trim();
									
									element[tagAttrIndex][tagAttrStyleIndex] = tagAttrStyleValue;
								}
							}
							else
							{
								element[tagAttrIndex] = tagAttrValue;
							}
						}
					}
					
					content ? (element.innerHTML = content) : false;
					
					return element;
				}
				else if(tagType === Array)
				{
					
				}
				
				return false;
			}
		},
		
		/*
		 * All jobs on 'add' key. 
		 * 
		 * Available(0)
		 */
		add: {
		},
		
		/*
		 * All jobs on 'remove' key. 
		 * 
		 * Available(0)
		 */
		remove: {
		},
		
		/*
		 * All jobs on 'load' key. 
		 * 
		 * Available(0)
		 */
		load: {
		},
	};
}
