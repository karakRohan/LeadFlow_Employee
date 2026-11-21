import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';
console.log("My URI:", process.env.MONGO_URI);
// console.log("My Port:", process.env.PORT);
const port = process.env.PORT || 5000;
connectDB().then(() => app.listen(port, () => console.log(`API running on port ${port}`))).catch(err => { console.error('Startup failed:', err.message); process.exit(1); });
