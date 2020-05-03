const express = require("express");
const cors = require("cors")
const app = express();
const path = require("path");
const fs = require("fs");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/", (req, res) => {
    const html = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    ${req.body.css}
    </style>
</head>

<body>
    ${req.body.html}
    <script>
        ${req.body.code}
    </script>
</body>

</html>
    `
    fs.writeFile(path.join(__dirname, "public/code.html"), html, (err, data) => {
        if (err) throw err
    })


    res.end();
})

app.listen(8001, () => console.log("Server started on PORT 8001"));