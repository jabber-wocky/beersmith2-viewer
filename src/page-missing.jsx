module.exports = function (type) {
	if (type === "recipes") {
		return `
		<h1 class="page-header">Recipes</h1>
		<div id="recipes">
			<div class="alert alert-warning">
			  <strong>Recipes not configured!</strong><br />
			  Please make sure to add your recipe.bsmx url to your <a href="#" data-toggle="modal" data-target="#modal-settings">settings</a>. 
			</div>
		</div>
		`;
	} else if (type === "grains") {
		return `
		<h2>Grain</h2>
		<div class="alert alert-warning">
		  <strong>Grain not configured!</strong><br />
		  Please make sure to add your grain.bsmx url to your <a href="#" data-toggle="modal" data-target="#modal-settings">settings</a>. 
		</div>
		`;
	} else if (type === "hops" ) {
		return `
		<h2>Hops</h2>
		<div class="alert alert-warning">
		  <strong>Hops not configured!</strong><br />
		  Please make sure to add your hops.bsmx url to your <a href="#" data-toggle="modal" data-target="#modal-settings">settings</a>. 
		</div>
		`;
	}
	else if (type === "yeasts" ) {
		return `
		<h2>Yeast</h2>
		<div class="alert alert-warning">
		  <strong>Yeast not configured!</strong><br />
		  Please make sure to add your yeasts.bsmx url to your <a href="#" data-toggle="modal" data-target="#modal-settings">settings</a>. 
		</div>
		`;
	}
};