function bugtracker(BugsService) {
  return {
    controller: BugTrackerController,
    restrict: 'E',
    scope: {},
    templateUrl: 'modules/bugtracker/bugtracker.partial.html'
  };

  function BugTrackerController($scope) {

    // --------------------------------
    // --------- init -----------------
    // --------------------------------

    // cached complete list of bugs
    var _bugs = [];

    // set up a clean form
    function initForm() {
      $scope.form = {
        userId: 1,
        description: '',
        points: '1',
        completed: false
      }
    }

    // fetch all bugs
    function loadList() {
      BugsService.get()
        .then((data) => {
          _bugs = data;
        });
    }

    /**
     * A helper function to count up bugs or points.
     * @param  {Number} pointVal - Count bugs that are of this point value.
     * @param  {String} completedFilter - Count bugs that are in this status.
     * @param  {Boolean} totalPoints - True if we want to get a total all the points, false if we just want the number of bugs.
     * @return {Number} - If totalPoints is true, the sum of all the matching bugs' points; otherwise, the number of matching bugs.
     */
    function sumBugs(pointValue, completedFilter, totalPoints) {
      var reduced = 0;

      if (_bugs.length) {
        reduced = _bugs.reduce(function (sum, bug) {
          var pointsMatch = bug.points === pointValue;
          var filterMatch = completedFilter === 'all' || bug.completed.toString() === completedFilter;
          var valToAdd = totalPoints ? bug.points : 1;

          // If this bug is a match, add to the sum.
          return sum += (pointsMatch && filterMatch
            ? valToAdd
            : 0);
        }, 0);
      }

      return reduced;
    }

    // form obj for new bugs
    $scope.form = {};

    // default radio selection
    $scope.completedFilter = 'all';

    // ----------------------------------------
    // --------- service calls ----------------
    // --- demonstrate promises / api calls ---
    // ----------------------------------------

    /**
     * NOTES
     * - operate on the cached _bugs
     * - AFTER successful create
     * --- insert into list
     * --- reset the form
     *
     * @param data {object} - the bug to be created (object)
     */
    $scope.addNewBug = function(data) {
      BugsService.create(data)
        .then((data) => {
          // Add newly created bug to the cached array.
          _bugs.push(data);
          // Show a blank form again after bug is added.
          initForm();
        })
    };

    /**
     * NOTES
     * - operate on the cached _bugs
     * - remove from list AFTER successful deletion
     *
     * @param data {object} - the bug (object) to be deleted
     */
    $scope.deleteBug = function(data) {
      var delIdx;

      // Find the index in the cached array of the bug to delete.
      for (let b=0; b<_bugs.length; b++) {
        if (data.id === _bugs[b].id) {
          delIdx = b;
          break;
        }
      }

      // Call the bugs service to delete the desired bug by ID.
      BugsService.delete(data.id)
        .then((data) => {
          // When the bug has been deleted, remove from the cached array at the index we found above.
          _bugs.splice(delIdx, 1);
        });
    };

    /**
     * NOTES
     * - when the status changes, we need to persist that change
     *
     * @param data {object}
     */
    $scope.updateBug = function(data) {
      BugsService.update(data)
        .then((data) => {
          // Find the updated bug in the array; replace the cached value with the new value from the data store.
          for (let b=0; b<_bugs.length; b++) {
            if (data.id === _bugs[b].id) {
              _bugs[b] = data;
              break;
            }
          }
        });
    };

    // ---------------------------------------------
    // --------- helper functions ------------------
    // --- demonstrate filters / maps / reducers ---
    // ---------------------------------------------

    /**
     * NOTE - operate on the cached _bugs
     *
     * @param {String} completedFilter - completed status
     * @returns {Array}
     *
     * ex: return an array of bugs that match the appropriate status
     */
    $scope.filteredList = function(completedFilter) {
      // If the filter is set to 'all', then we want all the bugs...
      return completedFilter === 'all'
        ? _bugs
        : _bugs.filter(function (bug) {
          // Otherwise, filter the bugs by their completed status.
          return bug.completed.toString() === completedFilter;
        });
    };

    /**
     * NOTE - operate on the cached _bugs
     * - total should also be based on radio selection (ex: "done" is selected, show the sum for all tasks that are marked "done")
     *
     * @param {Number} points - the point value you want to sum up
     * @param {String} completedFilter - completed status
     * @returns {Number} - the sum for the point value specified and restricted to the which completion value is selected
     *
     * ex: show me the sum of all the 4 point bugs that are marked "done".
     */
    $scope.getSum = function(pointValue, completedFilter) {
      return sumBugs(pointValue, completedFilter);
    };

    /**
     * NOTE - operate on the cached _bugs
     * - total should also be based on radio selection (ex: "done" is selected, show the total number of tasks that are marked "done")
     *
     * @param {Number} points - the point value you want to count
     * @param {String} completedFilter - completed status
     * @returns {Number} - total number based on the point value specified and restricted to the which completion value is selected
     *
     * ex: show me the number of 4 point bugs that are marked "done".
     */
    $scope.getTotal = function(pointValue, completedFilter) {
      return sumBugs(pointValue, completedFilter, true);
    };

    // Initialize the form, retrieve the stored data.
    initForm();
    loadList();    

  }
}

export default bugtracker;
