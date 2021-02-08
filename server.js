const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Mongo1 = require("./src/Models/Mongo");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();
app.use(cors());
app.use("/", serveStatic(path.join(__dirname, "/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

mongoose
  .connect(
    "mongodb+srv://darwin:gand27ef@cluster0.jiys8.mongodb.net/react?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    /**new addded */

    /**new addded */
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

app.get("/gnote/", async (req, res) => {
  const x = await Mongo1.find();

  res.send(x);
});

app.post("/gnote", async (req, res) => {
  await Mongo1.create(req.body).then((e) => {
    res.send(e);
  });
});

// router.delete("/darwin/:id", (req, res) => {
//   //console.log(req.params.id);
//   Darwin.findByIdAndDelete({ _id: req.params.id }).then((e) => {
//     console.log(res.body);
//   });

app.delete("/gnote/:id", async (req, res) => {
  console.log(req.params.id);
  await Mongo1.findByIdAndDelete(req.params.id).then((e) => {
    console.log(res.body);
  });
});
app.put("/gnote/:id", async (req, res) => {
  await Mongo1.findByIdAndUpdate({ _id: req.params.id }, req.body).then((e) => {
    Mongo1.findOne({ _id: req.params.id }).then((y) => console.log(y));
  });
  res.send({ type: "put" });
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log("listening @port:", port);
});
