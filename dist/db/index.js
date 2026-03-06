import knex from 'knex';
const knexInstance = knex({
    client: "pg",
    connection: {
        host: process.env.POSTGRES_HOST || 'db',
        port: Number(process.env.POSTGRES_PORT) || 5432,
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'postgres',
    },
    migrations: {
        directory: "./migrations",
    },
});
export default knexInstance;
//# sourceMappingURL=index.js.map