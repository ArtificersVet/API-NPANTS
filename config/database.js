import { createPool} from 'mysql2/promise'

export const pool =createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'WJ28@krhps',
    pool : 3306,
    database: 'dboucr20240905'
})