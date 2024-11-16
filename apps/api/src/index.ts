import { createServer } from './server';
import 'dotenv/config';

const port = process.env.PORT || 5001;
const server = createServer();

server.listen(port, () => {
	console.log(`api running on ${port}`);
});
