import connection from "../database/postgres.js";

async function getUserByEmail(email: string) {
  return connection.query("SELECT * FROM users WHERE email = $1;", [email]);
}

async function createUser(name: string, email: string, encryptedPassword: string, image: string){
    return connection.query(
        "INSERT INTO users (name, email, password, image) VALUES ($1, $2, $3, $4);",
        [name, email, encryptedPassword, image]
      )
}

async function sessionUpsert(user_id: number | string, token: string){
    return connection.query(`INSERT INTO sessions(user_id, token) VALUES ($1, $2)
    ON CONFLICT(token) DO UPDATE SET token=$2, "created_at"=NOW() WHERE sessions.user_id =$1;`,[user_id, token])
}

async function getUserSessionToken(user_id: number | string){
    return connection.query('SELECT token FROM sessions WHERE "user_id"=$1;', [user_id])
}

export {
    getUserByEmail,
    createUser,
    sessionUpsert,
    getUserSessionToken
}