const express = require("express");
const router = express.Router();
const { UserGames, UserGameBiodatas, UserGameHistories } = require("../models");

router.get("/:id", (req, res) => {
  const { id: queryId } = req.params;
  UserGames.findOne({
    where: {
      id: queryId,
    },
  }).then((user) => {
    res.render("HistoryGameForm", {
      user,
      history: {},
    });
  });
});

router.post("/modify", (req, res, next) => {
  const { id, historyid, score } = req.body;
  console.log(req.body);
  if (historyid === " ") {
    UserGameHistories.create({
      UserId: id,
      score: score,
      achieved_on: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }).then((newScores) => {
      res.redirect("/Dashboard");
    });
  } else {
    UserGameHistories.findOne({
      where: {
        id: historyid,
      },
    }).then((history) => {
      (history.score = score), (history.updatedAt = new Date());
      history.save();
      res.redirect("/Dashboard");
    });
  }
});

// HistroyGameForm/delete/1
router.get("/delete/:id", (req, res) => {
  const { id: historyId } = req.params;
  UserGameHistories.destroy({
    where: { id: historyId },
  })
    .then(() => {
      res.redirect("/Dashboard");
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error", { err });
    });
});
router.get("/edit/:id", (req, res) => {
  const { id: historyId } = req.params;
  UserGameHistories.findOne({
    where: { id: historyId },
  })
    .then((gameHistory) => {
      UserGames.findOne({
        where: { id: gameHistory.UserId },
      }).then((user) => {
        res.render("HistoryGameForm", {
          user: { id: user.id, userName: user.userName },
          history: { id: gameHistory.id, score: gameHistory.score },
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error", { err });
    });
});

module.exports = router;
