const express = require('express');
const cors = require('cors');
// const dbConnect = require('./utils/dbConnect');
const toolsRoute = require('./routes/v1/tools.route.js');
const viewCount = require('./middleware/viewCount');
const errorHandler = require('./middleware/errorHandler');
const { connectToServer } = require('./utils/dbConnect.js');
const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.set("view engine", )

// app.use(viewCount);
// dbConnect();
// if(!dbConnect){
//     console.log("Database Connected");
// } else{
//     console.log("Database Not Found Error:404");
// }
connectToServer( (err) =>{
    if(!err){
        app.listen(port, () => {
            console.log(`listing port is ${port}`)
        })
        
    } else{
        console.log(err);
    }
})

app.use("/api/v1/tools", toolsRoute);

app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/public/test.html")
    res.send("Yeah Server is Ready For Work !")
})

app.use(errorHandler)

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (error) => {
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});