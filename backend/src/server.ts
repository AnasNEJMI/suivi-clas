import app from "./app";
import 'dotenv/config';

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
    console.log(`Node server running on https://localhost:${SERVER_PORT}`);
})