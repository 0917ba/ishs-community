import fs from 'fs'
import path from 'path'

let jsn = fs.readFileSync(path.join(__dirname, 'config.json')).toString();

let cf = JSON.parse(jsn)

export { cf };