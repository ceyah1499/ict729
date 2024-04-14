import { config } from 'dotenv';
import { executeUsersCrudOperations } from './users.js';


config();
await executeUsersCrudOperations();