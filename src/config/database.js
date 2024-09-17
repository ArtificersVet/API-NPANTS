import { createPool} from 'mysql2/promise'

export const pool =createPool({
    host : '127.0.0.1',
    user : 'root',
    password : '12345678',
    pool : 3306,
    database: 'dboNPANTS'
})