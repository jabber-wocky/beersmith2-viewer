module.exports = 
	 `
	 <div class="modal fade" id="modal-settings" tabindex="-1" role="dialog">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title">User Settings</h4>
	      </div>
	      <div class="modal-body">
			<div class="form-group">
				<label for="unit">Units</label>
				<select id="unit" class="form-control">
					<option value="metric">Metric</option>
					<option value="imperial">Imperial (US)</option>
				</select>
			</div>			

			<div class="form-group">
				<label for="bsmx-recipes-url">Recipes</label>
				<input type="url" class="form-control" id="bsmx-recipes-url" placeholder="">
			</div>
			<div class="form-group">
				<label for="bsmx-grains-url">Grains</label>
				<input type="url" class="form-control" id="bsmx-grains-url" placeholder="">
			</div>
			<div class="form-group">
				<label for="bsmx-hops-url">Hops</label>
				<input type="url" class="form-control" id="bsmx-hops-url" placeholder="">
			</div>
			<div class="form-group">
				<label for="bsmx-yeasts-url">Yeasts</label>
				<input type="url" class="form-control" id="bsmx-yeasts-url" placeholder="">
			</div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
	        <button id="btn-settings-save" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->
	`;
