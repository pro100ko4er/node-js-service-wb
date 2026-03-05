import knex from 'knex'

const knexInstance = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
  migrations: {
    directory: "./migrations",
  },
})

export default knexInstance