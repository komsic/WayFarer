export default class Utility {
  static promiseGenerator(data, fun) {
    return new Promise((resolve, reject) => {
      fun(data)
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  static promiseGeneratorForArray(data, fun, errorMessage) {
    return new Promise((resolve, reject) => {
      fun(data)
        .then((result) => {
          if (result.rowCount === 0) {
            reject(new Error(errorMessage));
          }

          resolve(result.rows);
        });
    });
  }
}
