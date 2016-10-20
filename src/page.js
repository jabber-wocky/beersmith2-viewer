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
  document.getElementById('menu-ingredients-link').addEventListener('click', this.ingredients.bind(this), false);
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
  if (this.data.recipes === '' || this.data.recipes === null) {
    this._showHtmlString(require("page-missing.jsx")("recipes"))
    return;
  }

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

  xsl = utils.parseXml(require("xsl/recipe-details.xsl"));

  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  xsltProcessor.setParameter(null, "folder", folder);
  xsltProcessor.setParameter(null, "recipe", recipe);
  resultDocument = xsltProcessor.transformToFragment(this.data.recipes, document);
  
  this._showHtmlString(require("page-recipe-details.jsx"));
  document.getElementById('recipe-details').appendChild(resultDocument);

  utils.getCalc();  

  this.refreshUnits();

  document.querySelectorAll('.note').forEach(function (ele) {
    var html = ele.innerHTML.replace(/\n/g,"<br />");
    ele.innerHTML = html;
  }, this);

}

Page.prototype.refreshUnits = function () {
  document.querySelectorAll('[data-unit]').forEach(function(ele) {
    if (ele.attributes['data-unit'].value === this.settings.unit) {
      ele.classList.remove("hide");
    } else {
      ele.classList.add("hide");
    }
  }, this);
}

Page.prototype.ingredients = function () {
  this._showHtmlString(require("page-ingredients.jsx"));
  this.displayHops();
  this.displayGrains();
  this.displayYeasts();
  this.refreshUnits();
}

Page.prototype.displayGrains = function () {
  if (this.data.grains === '' || this.data.grains === null) {
    document.getElementById('grains').innerHTML = require("page-missing.jsx")("grains");
    return;
  }

  xsl = utils.parseXml(require("xsl/grains.xsl"));
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(this.data.grains, document);
  document.getElementById("grains").appendChild(resultDocument);
}

Page.prototype.displayHops = function () {
  if (this.data.hops === '' || this.data.hops === null) {
    document.getElementById('hops').innerHTML = require("page-missing.jsx")("hops");
    return;
  }

  xsl = utils.parseXml(require("xsl/hops.xsl"));
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(this.data.hops, document);
  document.getElementById("hops").appendChild(resultDocument);
}

Page.prototype.displayYeasts = function () {
  if (this.data.yeasts === '' || this.data.yeasts === null) {
    document.getElementById('yeasts').innerHTML = require("page-missing.jsx")("yeasts");
    return;
  }

  xsl = utils.parseXml(require("xsl/yeasts.xsl"));
  xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsl);
  resultDocument = xsltProcessor.transformToFragment(this.data.yeasts, document);
  document.getElementById("yeasts").appendChild(resultDocument);
}


Page.prototype.settingsModal = function () {
  this._addModal(require("page-settings.jsx"));

  const dbSettingsRefObject = this.firebase.database().ref('settings/' + this.firebase.auth().currentUser.uid + '/');
  const dbUserRefObject = this.firebase.database().ref('user/' + this.firebase.auth().currentUser.uid + '/');

  /*------------------------------------------------
    LISTENERS
   ------------------------------------------------ */
   dbUserRefObject.child('unit').on('value', function(snapshot) {
    this.settings.unit = 'metric';
    if (snapshot.exists()) {
      this.settings.unit = snapshot.val();
      document.getElementById('unit').value = this.settings.unit;
      this.refreshUnits();
    }
   }.bind(this));
  // recipes
  dbSettingsRefObject.child('bsmxRecipesUrl').on('value', function(snapshot) {
    console.log('recipe url updated');
    this.settings.bsmxRecipesUrl = '';
    this.data.recipes = '';
    if (snapshot.exists()) {
      this.settings.bsmxRecipesUrl = snapshot.val();
      this.data.recipes = utils.loadXMLDoc(this.settings.bsmxRecipesUrl);
      document.getElementById('bsmx-recipes-url').value = this.settings.bsmxRecipesUrl;
    }

    if (document.getElementById('recipes') !== null) {
      this.recipes();  
    }
  }.bind(this));
  // grains
  dbSettingsRefObject.child('bsmxGrainsUrl').on('value', function(snapshot) {
    console.log('grain url updated');
    this.settings.bsmxGrainsUrl = '';
    this.data.grains = '';
    if (snapshot.exists()) {
      this.settings.bsmxGrainsUrl = snapshot.val();
      this.data.grains = utils.loadXMLDoc(this.settings.bsmxGrainsUrl);
      document.getElementById('bsmx-grains-url').value = this.settings.bsmxGrainsUrl;
    }
    if (document.getElementById('ingredients') !== null) {
      this.ingredients();  
    }
  }.bind(this));
  // hops
  dbSettingsRefObject.child('bsmxHopsUrl').on('value', function(snapshot) {
    console.log('hop url updated');
    this.settings.bsmxHopsUrl = '';
    this.data.hops = '';
    if (snapshot.exists()) {
      this.settings.bsmxHopsUrl = snapshot.val();
      this.data.hops = utils.loadXMLDoc(this.settings.bsmxHopsUrl);
      document.getElementById('bsmx-hops-url').value = this.settings.bsmxHopsUrl;
    }
    if (document.getElementById('ingredients') !== null) {
      this.ingredients();  
    }
  }.bind(this));
  // yeasts
  dbSettingsRefObject.child('bsmxYeastsUrl').on('value', function(snapshot) {
    console.log('yeast url updated');
    this.settings.bsmxYeastsUrl = '';
    this.data.yeasts = '';
    if (snapshot.exists()) {
      this.settings.bsmxYeastsUrl = snapshot.val();
      this.data.yeasts = utils.loadXMLDoc(this.settings.bsmxYeastsUrl);
      document.getElementById('bsmx-yeasts-url').value = this.settings.bsmxYeastsUrl;
    }
    if (document.getElementById('ingredients') !== null) {
      this.ingredients();  
    }
  }.bind(this));

  /*------------------------------------------------
    UPDATE
   ------------------------------------------------ */
  document.getElementById('btn-settings-save').addEventListener('click', function () {
    console.log("Saving settings");
    dbSettingsRefObject.child('bsmxRecipesUrl').set(document.getElementById('bsmx-recipes-url').value);
    dbSettingsRefObject.child('bsmxGrainsUrl').set(document.getElementById('bsmx-grains-url').value);
    dbSettingsRefObject.child('bsmxHopsUrl').set(document.getElementById('bsmx-hops-url').value);
    dbSettingsRefObject.child('bsmxYeastsUrl').set(document.getElementById('bsmx-yeasts-url').value);
    dbUserRefObject.child('unit').set(document.getElementById('unit').value);
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


