import { JSONFileWrite } from '../utils/json-write';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({input, output});
const response_path = await rl.question('Directory for file');
const fileDir = path.resolve(path.basename(__dirname)) //TODO FINISH SETTING UP ROOT DIR PATH