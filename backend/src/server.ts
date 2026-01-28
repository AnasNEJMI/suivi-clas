import app from "./app.js";

const SERVER_PORT = process.env.SERVER_PORT;
if (!SERVER_PORT) {
  throw new Error("SERVER_PORT is not defined")
}

app.listen(SERVER_PORT, () => {
    console.log(`Node server running on https://localhost:${SERVER_PORT}`);
})