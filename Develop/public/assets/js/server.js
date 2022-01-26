const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

//
app.length('/note', (req,res) => {

    // send the file `notes.html` 
})
// look back at unit 11 day 1 activity 7 or so for res.sendFile and 31.18 in video on get requests
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);