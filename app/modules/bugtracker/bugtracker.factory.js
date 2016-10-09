/**
 * API DOCUMENTATION
 * https://github.com/typicode/json-server
 *
 * data - local file - bugs.json
 * API endpoint - http://localhost:3000/bugs
 * NOTE - must be running json-server to reach endpoint
 *
 */
function BugsService($http) {

  /**
   * The endpoint for data storage / retrieval.
   * @type {String}
   */
  var DATA_ENDPOINT = 'http://localhost:3000/bugs/';

  /**
   * create new
   * POST    /bugs
   *
   * @param payload {object}
   * @returns {Promise}
   */
  function create(payload) {
    return $http({
      url: DATA_ENDPOINT,
      method: 'POST',
      dataType: 'json',
      data: payload
    }).then((response) => {
      return response.data;
    });
  }

  /**
   * delete single by id
   * DELETE    /bugs/:id
   *
   * @param id {Number}
   * @returns {Promise}
   */
  function del(id) {
    return $http({
      url: DATA_ENDPOINT + id,
      method: 'DELETE',
      dataType: 'json'
    }).then((response) => {
      return response;
    });
  }

  /**
   * get full list
   * GET    /bugs
   *
   * @returns {Promise}
   */
  function get() {
    return $http({
      url: DATA_ENDPOINT,
      method: 'GET',
      dataType: 'json',
    }).then((response) => {
      return response.data;
    });
  }

  /**
   *
   * @param payload {object}
   * @returns {Promise}
   */
  function update(payload) {
    return $http({
      url: DATA_ENDPOINT + payload.id,
      method: 'PATCH',
      dataType: 'json',
      data: payload
    }).then((response) => {
      return response.data;
    });
  }

  return {
    create: create,
    delete: del,
    get: get,
    update: update
  }
}

export default BugsService;