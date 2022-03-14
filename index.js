const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const accommodationRoute = require("./routes/accommodations")
const bookRoute = require("./routes/books")
const bloodRoute = require("./routes/blood")
const reportsRoute = require("./routes/reports")
const entrepreneurRoute = require("./routes/entrepreneur")
const otherThingsRoute = require("./routes/otherThings")
const commentRoute = require("./routes/comment")
const contactRoute = require("./routes/contact")
const validUsersRoute = require("./routes/validUsers")
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/accommodations",accommodationRoute)
app.use("/api/books",bookRoute)
app.use("/api/entrepreneur",entrepreneurRoute)
app.use ("/api/otherThings",otherThingsRoute)
app.use("/api/blood",bloodRoute)
app.use("/api/reports",reportsRoute)
app.use("/api/comment", commentRoute)
app.use("/api/validUsers", validUsersRoute)
app.use("/api/contact",contactRoute)


app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running.");
});
