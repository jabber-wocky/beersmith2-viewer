var utils = require("utils");

var Page = function () {};

Page.prototype._clear = function () {
  document.getElementById("content").innerHTML = "";
};

Page.prototype._addModal = function (html) {
  var modal = document.createElement('div');
  modal.innerHTML = html;
  document.getElementById('modals').appendChild(modal);
}

Page.prototype._showDocument = function (doc) {
  this._clear();
  document.getElementById("content").appendChild(doc);
}

Page.prototype._showHtmlString = function (html) {
  this._clear();
  document.getElementById("content").innerHTML = html;
}


Page.prototype.init = function (urls, firebase) {
  this.firebase = firebase;
}

Page.prototype.recipes = function () {
  xsl = utils.loadXSLDoc("/cdn/xsl/recipes-list.xsl");
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);

  if ((typeof page_urls !== 'undefined') && (typeof page_urls.recipe_details !== 'undefined'))  {
    xsltProcessor.setParameter(null, "path", page_urls.recipe_details);
  } else {
    xsltProcessor.setParameter(null, "path", "recipe-details.html");
  }

  resultDocument = xsltProcessor.transformToFragment(this.xml.recipes, document);
  this._showDocument(resultDocument); 
}

Page.prototype.settings = function () {
  this._addModal(require("page-settings.jsx"));
  const dbRefObject = this.firebase.database().ref('users/' + this.firebase.auth().currentUser.uid + '/settings');

  // listeners
  dbRefObject.child('bsmx-recipes-url').on('value', function(snapshot) {
    document.getElementById('bsmx-recipes-url').value = snapshot.val();
  });
  dbRefObject.child('bsmx-grains-url').on('value', function(snapshot) {
    document.getElementById('bsmx-grains-url').value = snapshot.val();
  });
  dbRefObject.child('bsmx-hops-url').on('value', function(snapshot) {
    document.getElementById('bsmx-hops-url').value = snapshot.val();
  });
  dbRefObject.child('bsmx-yeasts-url').on('value', function(snapshot) {
    document.getElementById('bsmx-yeasts-url').value = snapshot.val();
  });

  // update
  document.getElementById('btn-settings-save').addEventListener('click', function () {
    console.log("Saving settings");
    dbRefObject.child('bsmx-recipes-url').set(document.getElementById('bsmx-recipes-url').value);
    dbRefObject.child('bsmx-grains-url').set(document.getElementById('bsmx-grains-url').value);
    dbRefObject.child('bsmx-hops-url').set(document.getElementById('bsmx-hops-url').value);
    dbRefObject.child('bsmx-yeasts-url').set(document.getElementById('bsmx-yeasts-url').value);
  }, false);
}

module.exports = new Page();


