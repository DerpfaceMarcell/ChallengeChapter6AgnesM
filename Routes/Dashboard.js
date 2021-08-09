const express = require("express");
const router = express.Router();
const { UserGames, UserGameBiodatas, UserGameHistories } = require("../models");

router.get("/", (req, res) => {
  UserGames.findAll({
    order: [["id", "ASC"]],
    include: [{ model: UserGameBiodatas }, { model: UserGameHistories }],
  })
    .then((allUserGameData) => {
      res.render("Dashboard", {
        allUserGameData,
      });
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });
});

router.patch("/edit/:id", (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId || 1;

  return UserGameBiodatas.update(
    { UserId: userId },
    {
      where: {
        id: +req.params.id,
      },
    }
  )
    .then(() => {
      res.json({ success: true });
    })
    .catch((e) => {
      console.log(e);
      res.json({ success: false });
    });
});

module.exports = router;
