const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { cmdtyModel, reportModel } = require("./model");

const PORT = process.env.PORT || 3000;
const mongoDB = "mongodb://localhost:27017/agrilinks";

app.use(express.json());

// app routes
app.get("/reports", async (req, res) => {
  let reportID = req.query.reportID;
  reportModel.findById(reportID, async (err, report) => {
    res.send(report);
  });
});

app.post("/reports", async (req, res) => {
  let newCmdtyData = req.body;
  try {
    let cmdty = new cmdtyModel(newCmdtyData);
    await cmdty.save();
  } catch (error) {
    res.status(500).send(error);
  }

  reportModel.find(
    {
      marketID: newCmdtyData.marketID,
      cmdtyID: newCmdtyData.cmdtyID,
    },
    async (err, reports) => {
      let lastReport = reports[reports.length - 1];

      let users = lastReport.users;
      let avgBasePrice = lastReport.price;

      console.log(lastReport);

      users.push(newCmdtyData.userID);

      let reportData = {
        cmdtyID: newCmdtyData.cmdtyID,
        cmdtyName: newCmdtyData.cmdtyName,
        marketID: newCmdtyData.marketID,
        marketName: newCmdtyData.marketName,
        users: users,
        price:
          (avgBasePrice * (users.length - 1) +
            newCmdtyData.price / newCmdtyData.convFctr) /
          users.length,
      };

      try {
        let report = new reportModel(reportData);
        await report.save();
        res.send({
          success: true,
          reportID: report._id,
        });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  );
});

// mongoDB Connect
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});

// app started
app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});
