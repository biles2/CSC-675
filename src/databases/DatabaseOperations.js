const { con } = require('./dataSource');

const QueryBuilder = {
  build: {
    save: (name, data) => {
      const vIterator = Object.keys(data).map((i, idx) => `$${idx + 1}`.join(','));
      const keys = Object.keys(data).join(',');
      return `INSERT INTO ${name} (${keys}) VALUES (${vIterator})`;
    },

    filter: (name, { columns, where }) => {
      let conditions = '';

      if (where) {
        const conditionsKeys = Object.keys(where);
        const conditionValues = Object.values(where).map((value) => (typeof value === 'string' ? `'${value}'` : value));
        conditionsKeys.forEach((key, idx) => {
          conditions += `${key} = ${conditionValues[idx]} ${idx === conditionsKeys.length - 1 ? '' : 'AND'}`;
        });
      }

      let query = `SELECT ${columns ? columns.join() : '*'} FROM ${name}`;
      if (conditions) query += ` WHERE ${conditions}`;
      console.log(query);
      return query;
    },
  },
};

class DatabaseOperations {
  constructor(table) {
    this.table = table;
  }

  get(data = {}) {
    const sql = QueryBuilder.build.filter(this.table, data);

    return new Promise((resolve, reject) => {
      con.query(sql, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  save(data) {
    const sql = QueryBuilder.build.save(this.table, data);

    return new Promise((resolve, reject) => {
      con.query(sql, Object.values(data), (err, obj) => {
        if (err) {
          reject(err);
        } else {
          resolve(obj.rows);
        }
      });
    });
  }
}

module.exports = {
  DatabaseOperations,
};
