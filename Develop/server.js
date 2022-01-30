const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.use(express.urlencoded({extended:true}))

//
app.get('/notes', (req,res) => {
  // send the file `notes.html` 
  // look back at unit 11 day 1 activity 7 or so for res.sendFile and 31.18 in video on get requests
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req,res) => {
  // send the file `notes.html` 
  // look back at unit 11 day 1 activity 7 or so for res.sendFile and 31.18 in video on get requests
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
})

app.post('/api/notes', (req, res) => {

  let note = req.body;
  note.id = uuidv4()



  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;

    let noteToFile = JSON.parse(data);

    noteToFile.push(note);

    fs.writeFile("./db/db.json", JSON.stringify(noteToFile), "utf-8", () => {
    
      console.log(`Your note with title: ${note.title} and content ${note.text} has been saved, under id ${note.id}`)
    })
  })

  res.redirect("/notes");

});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);