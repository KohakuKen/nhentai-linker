walk (document.body, choiceArray);

function walk(node, choices) 
{
  // I stole this function from here:
  // https://github.com/Techjar/cloud-to-butt
	
	var child, next;
	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child, choices);
				child = next;
			}
			break;

		case 3: // Text node
      if(node.parentElement != null && node.parentElement.tagName.toLowerCase() != "script" && node.parentElement.tagName.toLowerCase() != "style" && node.parentElement.tagName.toLowerCase() != "textarea" && node.parentElement.contentEditable != "true") {
          handleText(node, choices);
      }
			break;
	}
}

function handleText(textNode, choices) 
{
  var nhentai = "https://nhentai.net/g/";
  var v = textNode.nodeValue;
  var codes = [];
  // codes = v.match(/\b\d\d\d\d\d\d?\b/g);

  for (var i = 0; i < choices.length; i++){
    var re = new RegExp("\\b[0-9]{" + choices[i] + "}\\b", "g");
    var matchResult =  v.match(re);

    if (matchResult != null){
      codes = codes.concat(matchResult)
    }
  }

  if (codes != null){
    for (var i = 0; i < codes.length; i++){
      var converted = nhentai + codes[i];
      v = v.replace(codes[i], `<a href=${converted}>${codes[i]}</a>`);
    }
      
    // https://stackoverflow.com/questions/47186663/how-to-make-a-chrome-extension-that-turns-specific-words-into-hyperlinks
    var htmlParser = document.createElement('div');
    htmlParser.innerHTML = v;
    var newNodes = htmlParser.childNodes;
    while (newNodes.length) {
      textNode.parentNode.insertBefore(newNodes[0], textNode);
    }
    textNode.parentNode.removeChild(textNode);
  }
}
