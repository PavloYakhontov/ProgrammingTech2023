const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello woasdasd!");
});

app.listen(3000, () => {
    console.log("Server is listening on portt 3000");
});