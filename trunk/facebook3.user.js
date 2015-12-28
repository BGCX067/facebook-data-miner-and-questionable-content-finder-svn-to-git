// ==UserScript==
// @name           Facebook Profile Miner
// @description    Stores data from your Facebook news feed.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @exclude        http://*.facebook.com/*sk=messages*
// @exclude        http://*.facebook.com/*sk=events*
// @exclude        http://*.facebook.com/*sk=media*
// ==/UserScript==
var head, newElement;
head = document.childNodes[0].childNodes[0]
if (head) {
    script = document.createElement("script");
	script.setAttribute("type","text/javascript")
	script.setAttribute("id","Matts script")
    document.body.parentNode.insertBefore(script, document.body.nextSibling);
script.innerHTML="function $(element) {\n\
  if (arguments.length > 1) {\n\
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)\n\
      elements.push($(arguments[i]));\n\
    return elements;\n\
  }\n\
  if (Object.isString(element))\n\
    element = document.getElementById(element);\n\
  return Element.extend(element);\n\
}\n\
function getElementsByClassName(classname, node)  {\n\
    if(!node) node = document.getElementsByTagName(\"body\")[0];\n\
    var a = [];\n\
    var re = new RegExp('\\b' + classname + '\\b');\n\
    var els = node.getElementsByTagName(\"*\");\n\
    for(var i=0,j=els.length; i<j; i++)\n\
        if(re.test(els[i].className))a.push(els[i]);\n\
    return a;\n\
}\n\
data=[];\n\
profiledata=[];\n\
if(document.URL.indexOf(\"http://www.facebook.com\")>-1 || document.URL.indexOf( \"http://facebook.com\")>-1)\n\
{\n\
data=getElementsByClassName(\"uiUnifiedStory\");\n\
profiledata=getElementsByClassName(\"UIIntentionalStory\");\n\
}\n\
var x;\n\
feedposts=[];\n\
profileposts=[];\n\
newprofileposts=[];\n\
x=0;\n\
/*alert(\"Your first wall post is: \" +[data[x].getAttribute(\"data-ft\"), data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].getAttribute(\"href\"),data[x].childNodes[0].childNodes[1].childNodes[1].lastChild.innerHTML])*/\n\n\
\n\
function homepagecrawl() {\n\
for (x in data)\n\
{\n\
feedposts[x]=[data[x].getAttribute(\"data-ft\"), data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, data[x].childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, data[x].childNodes[0].childNodes[1].childNodes[1].lastChild.innerHTML];\n\
}\n\
}\n\
\n\
/*if (document.body.className.indexOf(\"ego_page home\")>-1)\n\
{\
	\
setTimeout(homepagecrawl(),5000)\n\
}*/\n\
y=0;\n\
function profilecrawl() {\n\
	for (y in profiledata)\n\
	{\n\
		/*gets postID, actor name, actor\'s profile URL, and post text content*/\n\
		profileposts[y]=[profiledata[y].getAttribute(\"data-ft\"), profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].innerHTML, profiledata[y].childNodes[1].childNodes[1].childNodes[0].childNodes[0].href, profiledata[y].childNodes[1].childNodes[1].lastChild.innerHTML];\n\
		\n\
	}\n\
	document.write(profileposts);\n\
}\n\
if (document.body.className.indexOf(\"profile nile_profile\")>-1)\n\
{\n\
setTimeout(profilecrawl(),5000);\n\
document.write(profileposts);\n\
}\n\
\n\
z=0;\n\
function newProfileCrawl() {\n\
	for (z in data)\n\
	{\n\
		/*gets postID, actor name, actor\'s profile URL, and post text content*/\n\
		newProfilePosts[z]=[data[z].getAttribute(\"data-ft\"), data[z].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML, data[z].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].href, data[z].childNodes[0].childNodes[1].childNodes[0].lastChild.innerHTML];\n\
		\n\
	}\n\
	alert(newProfilePosts[0]);\n\
}\n\
/*if (document.body.className.indexOf(\"nile_profile\")==-1 && document.body.className.indexOf(\"profile\")>-1)\n\
{\n\
}\n*/";
}
if(document.URL.indexOf("http://www.facebook.com")>-1 || document.URL.indexOf( "http://facebook.com")>-1)
{
document.getElementById("pageNav").childNodes[2].innerHTML="<a onclick=\'newProfileCrawl();\' id=\'minerbutton\'>Mine!</a>"
}