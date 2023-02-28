import { createConnection } from 'mysql2'

const connection = createConnection({
    host: '127.0.0.1',
    password: 'Nosseralaa',
    database: 'hemaya-exam-system',
    port: '3306',
    user: 'root',
})

export default connection