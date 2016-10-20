var _ = require("lodash");
var utils = require("utils");

var Page = function () {
};

Page.prototype.init = function (firebase, myAuth) {
  this.firebase = firebase;
  this.myAuth = myAuth;
  this.settings = {};
  this.data = {
    recipes: '',
    grains: '',
    hops: '',
    yeasts: ''
  };
}

Page.prototype.login = function (firebaseUser) {
  // setup menu
  var navbar = document.getElementById('navbar');
  navbar.innerHTML = require('page-menu-login.jsx')(this.firebase.auth().currentUser);
  document.getElementById('btn-logout').addEventListener('click', this.myAuth.logout.bind(this.myAuth), false);
  document.getElementById('menu-recipe-link').addEventListener('click', this.recipes.bind(this), false);

  // load pages
  this.settingsModal();
  this.recipes();
};

Page.prototype.logout = function () {
  var navbar = document.getElementById('navbar');
  navbar.innerHTML = require('page-menu-logout.jsx');
  document.getElementById('btn-login').addEventListener('click', this.myAuth.login.bind(this.myAuth), false);

  // load pages
  this.gettingStarted();
}


Page.prototype.gettingStarted = function () {
  var html = require("page-gettingStarted.jsx");
  this._showHtmlString(html);
}

Page.prototype.recipes = function () {
  console.log('recipes');
  console.log(this.data.recipes);
  if (this.data.recipes === '' || this.data.recipes === null)
    return;

  xsl = utils.parseXml(require("xsl/recipes-list.xsl"));
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(this.data.recipes, document);

  this._showHtmlString(require("page-recipes.jsx"));
  document.getElementById('recipes').appendChild(resultDocument);

  _.forEach(document.getElementsByClassName('recipe-detail-link'), function (value) {
    value.addEventListener('click', function (ev) {
      console.log(ev);
      var folder = ev.target.attributes['data-folder'].value;
      var recipe = ev.target.attributes['data-recipe'].value;
      this.recipeDetail(folder, recipe)
    }.bind(this), false)
  }.bind(this));
}

Page.prototype.recipeDetail = function (folder, recipe) {
  console.log('recipes details ' + folder + ' ' + recipe);
  if (this.data.recipes === '' || this.data.recipes === null)
    return;

  this._clear();
  xsl = utils.parseXml(require("xsl/recipe-details.xsl"));

  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  xsltProcessor.setParameter(null, "folder", folder);
  xsltProcessor.setParameter(null, "recipe", recipe);
  resultDocument = xsltProcessor.transformToFragment(this.data.recipes, document);
  
  console.log(resultDocument);
  document.getElementById("content").appendChild(resultDocument);
    
  /*  
    $(".note").each(function () {
      $(this).html($(this).html().replace(/\n/g,"<br />"));
    });

    getCalc();
    
    loadUnitToggle();
    
    $("#recipe-details").show();
    */
}

Page.prototype.settingsModal = function () {
  this._addModal(require("page-settings.jsx"));

  const dbRefObject = this.firebase.database().ref('settings/' + this.firebase.auth().currentUser.uid + '/');

  /*------------------------------------------------
    LISTENERS
   ------------------------------------------------ */
  // recipes
  dbRefObject.child('bsmxRecipesUrl').on('value', function(snapshot) {
    console.log('recipe url updated');
    this.settings.bsmxRecipesUrl = '';
    this.data.recipes = '';
    if (snapshot.exists()) {
      this.settings.bsmxRecipesUrl = snapshot.val();
      this.data.recipes = utils.loadXMLDoc(this.settings.bsmxRecipesUrl);
      document.getElementById('bsmx-recipes-url').value = this.settings.bsmxRecipesUrl;
    }
    this.recipes();
  }.bind(this));
  // grains
  dbRefObject.child('bsmxGrainsUrl').on('value', function(snapshot) {
    console.log('grain url updated');
    this.settings.bsmxGrainsUrl = '';
    this.data.grains = '';
    if (snapshot.exists()) {
      this.settings.bsmxGrainsUrl = snapshot.val();
      this.data.grains = utils.loadXMLDoc(this.settings.bsmxGrainsUrl);
      document.getElementById('bsmx-grains-url').value = this.settings.bsmxGrainsUrl;
    }
  }.bind(this));
  // hops
  dbRefObject.child('bsmxRecipesUrl').on('value', function(snapshot) {
    console.log('hop url updated');
    this.settings.bsmxHopsUrl = '';
    this.data.hops = '';
    if (snapshot.exists()) {
      this.settings.bsmxHopsUrl = snapshot.val();
      this.data.hops = utils.loadXMLDoc(this.settings.bsmxHopsUrl);
      document.getElementById('bsmx-hops-url').value = this.settings.bsmxHopsUrl;
    }
  }.bind(this));
  // yeasts
  dbRefObject.child('bsmxYeastsUrl').on('value', function(snapshot) {
    console.log('yeast url updated');
    this.settings.bsmxYeastsUrl = '';
    this.data.yeasts = '';
    if (snapshot.exists()) {
      this.settings.bsmxYeastsUrl = snapshot.val();
      this.data.yeasts = utils.loadXMLDoc(this.settings.bsmxYeastsUrl);
      document.getElementById('bsmx-yeasts-url').value = this.settings.bsmxYeastsUrl;
    }
  }.bind(this));

  /*------------------------------------------------
    UPDATE
   ------------------------------------------------ */
  document.getElementById('btn-settings-save').addEventListener('click', function () {
    console.log("Saving settings");
    dbRefObject.child('bsmxRecipesUrl').set(document.getElementById('bsmx-recipes-url').value);
    dbRefObject.child('bsmxGrainsUrl').set(document.getElementById('bsmx-grains-url').value);
    dbRefObject.child('bsmxHopsUrl').set(document.getElementById('bsmx-hops-url').value);
    dbRefObject.child('bsmxYeastsUrl').set(document.getElementById('bsmx-yeasts-url').value);
  }, false);

}


// helpers

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



module.exports = new Page();


