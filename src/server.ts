import dotenv from "dotenv";
import app, { init } from "./app.js";
dotenv.config();

const PORT = +process.env.PORT || 4000;

init().then(() => {
    app.listen(PORT, () => {
    /* eslint-disable-next-line no-console */
        console.log(`Server is listening on port ${PORT}.`);
    });
});