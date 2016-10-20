var xml_urls = {
  'recipes' : 'https://dl.dropboxusercontent.com/s/bb8ueaxms1wdlsc/Recipe.bsmx?dl=1',
  'hops': 'https://dl.dropboxusercontent.com/s/qr8rlhrwn6jqtor/Hops.bsmx?dl=1',
  'grains' : 'https://dl.dropboxusercontent.com/s/bxfoei32z4gokk2/Grain.bsmx?dl=1',
  'yeasts' : 'https://dl.dropboxusercontent.com/s/7wr7l32s9rtbnp2/Yeast.bsmx?dl=1'
};

var page_urls = {
	'index' : 'index.html',
	'ingredients' : 'ingredients.html',
	'recipe_details' : 'recipe-details.html',
	'recipes' : 'recipes.html',
	'setup' : 'setup.html'
};

$(document).ready(function(){
  beersmithViewerLoad(xml_urls);
});

// Recipe files:
// francois: 'recipes' : 'https://dl.dropboxusercontent.com/s/rje8cr8kein9kqn/Recipe.bsmx?dl=1',
// steve: 'recipes' : 'https://dl.dropboxusercontent.com/s/r9ojkey4unwoxdf/Recipe.bsmx?dl=1',



/* Tim:
var xml_urls = {
  'recipes' : 'https://dl.dropboxusercontent.com/s/9k43etqj256dse5/Recipe.bsmx?dl=1',
  'hops': 'https://dl.dropboxusercontent.com/s/9k43etqj256dse5/Hops.bsmx?dl=1',
  'grains' : 'https://dl.dropboxusercontent.com/s/9k43etqj256dse5/Grain.bsmx?dl=1',
  'yeasts' : 'https://dl.dropboxusercontent.com/s/9k43etqj256dse5/Yeast.bsmx?dl=1'
};

Mine:
var xml_urls = {
  'recipes' : 'https://dl.dropboxusercontent.com/s/bb8ueaxms1wdlsc/Recipe.bsmx?dl=1',
  'hops': 'https://dl.dropboxusercontent.com/s/qr8rlhrwn6jqtor/Hops.bsmx?dl=1',
  'grains' : 'https://dl.dropboxusercontent.com/s/bxfoei32z4gokk2/Grain.bsmx?dl=1',
  'yeasts' : 'https://dl.dropboxusercontent.com/s/7wr7l32s9rtbnp2/Yeast.bsmx?dl=1'
};

*/