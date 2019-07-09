import db from '../index';

const insertQuery = `INSERT INTO bus(number_plate, manufacturer, model, year, capacity)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;`;
export default class Bus {
  static createBus(numberPlate, manufacterer, model, year, capacity) {
    return db.query(insertQuery, [numberPlate, manufacterer, model, year, capacity]);
  }
}
