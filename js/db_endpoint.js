const PROTOCOL  = process.env.DB_PROTOCOL
const ADMINNAME = process.env.DB_ADMIN_NAME
const PASS      = process.env.DB_ADMIN_PASSWORD
const DOMAIN    = process.env.DB_DOMAIN
const PORT      = process.env.DB_PORT

export const DB_ENDPOINT = () => {
  const endpoint = PROTOCOL + ADMINNAME + ':' + PASS + '@' + DOMAIN + ':' + PORT
  console.log('db endpoint', endpoint)
  return endpoint
}