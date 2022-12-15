const { con } = require('./dataSource');

const QueryBuilder = {
  build: {
    save: (name, data) => {
      const vIterator = Object.keys(data).map((i, idx) => `$${idx + 1}`.join(','));
      const keys = Object.keys(data).join(',');
      const val = [name, keys, ...vIterator];
      const query = 'INSERT INTO ? (?) VALUES (?)';
      return {
        val,
        query,
      };
    },

    filter: (name, { columns, where, join, groupBy }) => {
      let conditions = '';
      const val = [];

      let query = `SELECT ${columns ? columns.join() : '*'} FROM ${name} `;
      if (join) {
        const tables = Object.keys(join);
        const values = Object.values(join);

        tables.forEach((table, idx) => {
          query += ` JOIN ${table} ON ${values[idx]}`;
        });
      }
      if (where) {
        const conditionsKeys = Object.keys(where);
        const conditionValues = Object.values(where).map((value) => (typeof value === 'string' ? `${value}` : value));
        conditionsKeys.forEach((key, idx) => {
          val.push(conditionValues[idx]);
          if (idx === conditionsKeys.length - 1 && conditionValues > 1) {
            conditions += `${key} = ?`;
          } else {
            conditions += `${key} = ?`;
          }
        });
      }
      if (conditions) query += ` WHERE ${conditions}`;
      if (groupBy) query += ` GROUPE BY ${groupBy.val}`;
      return {
        query,
        val,
      };
    },

    delete: (name, { where }) => {
      let conditions = '';
      const val = [];

      let query = `DELETE FROM ${name}`;
      if (where) {
        const conditionsKeys = Object.keys(where);
        const conditionValues = Object.values(where);
        conditionsKeys.forEach((key, idx) => {
          val.push(conditionValues[idx]);
          if (idx === conditionsKeys.length - 1 && conditionValues > 1) {
            val.push('AND');
            conditions += `${key} = ?`;
          } else {
            conditions += `${key} = ?`;
          }
        });
      }
      if (conditions) query += ` WHERE ${conditions}`;
      return {
        query,
        val,
      };
    },
  },
};

class DatabaseOperations {
  constructor(table) {
    this.table = table;
  }

  query = '';

  values = [];

  get(data = {}) {
    const sqlVal = QueryBuilder.build.filter(this.table, data);
    this.query = sqlVal.query;
    this.values = sqlVal.val;

    return new Promise((resolve, reject) => {
      con.execute(this.query, this.values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  delete(data = {}) {
    const sqlVal = QueryBuilder.build.delete(this.table, data);
    this.query = sqlVal.query;
    this.values = sqlVal.val;

    return new Promise((resolve, reject) => {
      con.query(this.query, this.values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  save(data) {
    const sqlVal = QueryBuilder.build.save(this.table, data);
    this.query = sqlVal.query;
    this.values = sqlVal.val;

    return new Promise((resolve, reject) => {
      con.query(this.query, this.values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = {
  DatabaseOperations,
};
