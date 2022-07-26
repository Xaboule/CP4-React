const models = require('../models');
class FourController {
  static add = (req, res) => {
    const four = req.body;
    // TODO validations (length, format...)
    models.four
      .insert(four)
      .then(([result]) => {
        res.status(201).send({ result });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}
module.exports = FourController;
