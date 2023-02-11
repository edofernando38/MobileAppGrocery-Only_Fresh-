const db = require("../../models");
const bcrypt = require("bcrypt");
const picture = db.Picture;
const { Op } = require("sequelize");

module.exports = {
  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      await picture.create({
        pictureName: `upload/${fileUploaded.filename}`,
      });
      const getPicture = await picture.findOne({
        // where: {
        //   id: req.params.id,
        // },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.pictureName,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
