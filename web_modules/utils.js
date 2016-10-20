var Utils = function () {};

Utils.prototype.replaceAll = function (find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};

Utils.prototype.htmlDecode = function (input){
  var e = document.createElement('textarea');
  e.innerHTML = input;
  var result = "";
  result = this.replaceAll("&"," &amp; ", e.value);
  result = this.replaceAll(" < "," &lt; ", result);
  result = this.replaceAll(" > "," &gt; ", result);
  result = this.replaceAll("","", result);

  return result;
};

Utils.prototype.parseXml = function (xmlStr) {
    xmlStr = this.htmlDecode(xmlStr);

    if (window.DOMParser) {
        return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlStr);
        return xmlDoc;
    }
    return null;
};

Utils.prototype.loadXMLDoc = function (filename) {
    var xhttp;
    if (window.ActiveXObject)
      {
      xhttp = new ActiveXObject("Msxml2.XMLHTTP");
      }
    else
      {
      xhttp = new XMLHttpRequest();
      }
    xhttp.open("GET", filename, false);
    try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return this.parseXml(xhttp.responseText);
};

Utils.prototype.loadXSLDoc = function (filename) {
    var xhttp;
    if (window.ActiveXObject)
      {
      xhttp = new ActiveXObject("Msxml2.XMLHTTP");
      }
    else
      {
      xhttp = new XMLHttpRequest();
      }
    xhttp.open("GET", filename, false);
    try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
};

module.exports = new Utils();