import { config } from 'dotenv';
config({ path: './src/config.env' });

import { app } from './app.js';

const PORT = process.env.PORT || 3003;

app.listen(PORT, (err) => {
    if(err) {
        console.log("Error occured while running server: ", err);
    }
    console.log(`Server up and running on port: ${PORT}`);
});
