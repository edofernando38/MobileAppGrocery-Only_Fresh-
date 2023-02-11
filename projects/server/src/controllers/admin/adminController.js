const db = require("../../models");
const bcrypt = require("bcrypt");
const admin = db.Admin;
const branch = db.Branch;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const secretKey = process.env.SECRET_KEY;

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, password_confirmation, isSuper } =
        req.body.result2;
      const { BranchId } = req.body;

      if (password !== password_confirmation) throw `password not match`;

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const result = await admin.create({
        username,
        email,
        password: hashPass,
        isSuper,
        BranchId,
      });

      const token = jwt.sign({ username: username, email: email }, secretKey);

      const data = await branch.findOne({
        where: {
          id: req.body.BranchId,
        },
        include: [{ model: admin }],
      });

      await branch.update(
        {
          AdminId: result.dataValues.id,
        },
        {
          where: {
            id: req.body.BranchId,
          },
        }
      );

      res.status(200).send({
        message: "Register Succes",
        result,
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { usernameEmail, password } = req.body;

      const isUserExist = await admin.findOne({
        where: {
          [Op.or]: {
            username: usernameEmail ? usernameEmail : "",
            email: usernameEmail ? usernameEmail : "",
          },
        },
        raw: true,
      });

      if (!isUserExist) throw "Account not found";

      const payload = { username: isUserExist.username };
      const token = jwt.sign(payload, secretKey);

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Password incorrect`;

      res.status(200).send({
        message: "Login Succes",
        isUserExist,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, secretKey);
      const result = await admin.findOne({
        where: {
          username: verify.username,
        },
        raw: true,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const admins = await admin.findAll({
        where: {
          isSuper: 1,
        },
        attributes: ["username", "email", "isSuper"],
        raw: true,
      });
      res.status(200).send(admins);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
