var repoController = {};

repoController.index = function() {
  repos.requestAll(repoView.index);
};
