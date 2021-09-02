interface Grammar {
  base: string;
  where: string[];
  limit: string | null;
}

// Builder
interface SQLQueryBuilder {
  table(table: string): this;
  select(fields: string[]): this;
  where(field: string, operator: string, value: string): this;
  limit(start: number, offset: number): this;

  getSQL(): string;
}

// Concrete Builder
class MysqlQueryBuilder implements SQLQueryBuilder {
  query: Grammar;
  queryTable: string;

  constructor() {
    this.query = {
      base: '',
      where: [],
      limit: null,
    };
    this.queryTable = '';
  }

  reset(): void {
    this.query = {
      base: '',
      where: [],
      limit: null,
    };
  }

  table(table: string): this {
    this.queryTable = table;
    return this;
  }

  select(fields: string[]): this {
    this.query['base'] = `SELECT ${fields.join(',')} FROM ${this.queryTable}`;

    return this;
  }

  where(field: string, operator: string, value: string): this {
    this.query['where'].push(`${field} ${operator} ${value}`);

    return this;
  }

  limit(start: number, offset: number): this {
    this.query['limit'] = `LIMIT ${start}, ${offset}`;

    return this;
  }

  getSQL(): string {
    let sqlQuery = this.query.base;
    if (this.query.where.length > 0) {
      sqlQuery += ` WHERE ${this.query.where.join(' AND ')}`;
    }

    if (this.query.limit) {
      sqlQuery += ` ${this.query.limit}`;
    }

    sqlQuery += ';';

    return sqlQuery;
  }
}

class PostgresQueryBuilder implements SQLQueryBuilder {
  query: Grammar;
  queryTable: string;

  constructor() {
    this.query = {
      base: '',
      where: [],
      limit: null,
    };
    this.queryTable = '';
  }

  reset(): void {
    this.query = {
      base: '',
      where: [],
      limit: null,
    };
  }

  table(table: string): this {
    this.queryTable = table;
    return this;
  }

  select(fields: string[]): this {
    this.query['base'] = `SELECT ${fields.join(',')} FROM ${this.queryTable}`;

    return this;
  }

  where(field: string, operator: string, value: string): this {
    this.query['where'].push(`${field} ${operator} ${value}`);

    return this;
  }

  limit(start: number, offset: number): this {
    this.query['limit'] = `LIMIT ${start} OFFSET ${offset}`;

    return this;
  }

  getSQL(): string {
    let sqlQuery = this.query.base;
    if (this.query.where.length > 0) {
      sqlQuery += ` WHERE ${this.query.where.join(' AND ')}`;
    }

    if (this.query.limit) {
      sqlQuery += ` ${this.query.limit}`;
    }

    sqlQuery += ';';

    return sqlQuery;
  }
}

// Client
const mysqlBuilder = new MysqlQueryBuilder();
const mysqlQuery = mysqlBuilder
  .table('users')
  .select(['name, email, password'])
  .where('age', '>', '18')
  .where('age', '<', '30')
  .limit(10, 20)
  .getSQL();
console.log('mySQL query: ' + mysqlQuery);

const postgresBuilder = new PostgresQueryBuilder();
const postgresQuery = postgresBuilder
  .table('users')
  .select(['name, email, password'])
  .where('age', '>', '18')
  .where('age', '<', '30')
  .limit(10, 20)
  .getSQL();
console.log('postgres query: ' + postgresQuery);
