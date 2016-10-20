
module.exports = function (firebaseUser) {
return `
<ul class="nav navbar-nav">
  <li><a id="menu-recipe-link" href="#">Recipes</a></li>
  <li><a href="#">Ingredients</a></li>
</ul>
<ul class="nav navbar-nav navbar-right" id="navbar-menu-right">
  <li class="dropdown" id="user-info">
    <a href="#" id="user-info-pic" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
      ${ firebaseUser.displayName } <span class="caret"></span>
    </a>
    <ul class="dropdown-menu">
      <li><a href="#" data-toggle="modal" data-target="#modal-settings">Settings</a></li>
      <li role="separator" class="divider"></li>
      <li><a id="btn-logout" href="#">Log out</a></li>
    </ul>
  </li>
</ul>
`
};