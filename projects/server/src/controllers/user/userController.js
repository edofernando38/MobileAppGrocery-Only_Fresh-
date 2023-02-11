const db = require("../../models");
const user = db.User;
const profile = db.Profile;
const address = db.Address;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const transporter = require("../../middleware/transporter");
const fs = require("fs");
const handlebars = require("handlebars");
const secretKey = process.env.SECRET_KEY;
const urlReset = process.env.URL_RESETPASS;

module.exports = {
  register: async (req, res) => {
    try {
      const { name, phoneNumber, email, password, password_confirmation } =
        req.body;
      if (password !== password_confirmation)
        throw "Password doesnt match with confirm password";
      if (password.length < 8)
        throw "Password only valid if length is more than 8";

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.create({
        name,
        phoneNumber,
        email,
        password: hashPass,
        code_otp: hashOtp,
      });

      await profile.create({
        UserId: data.id,
      });

      // await address.create({
      //   UserId: data.id,
      // });

      const token = jwt.sign({ phoneNumber: phoneNumber }, secretKey, {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./src/template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        phoneNumber,
        code_otp,
      });

      await transporter.sendMail({
        from: "Only Fresh",
        to: email,
        subject: "Account Verification",
        html: tempResult,
      });

      res.status(200).send({
        message: "OTP code sent, please verify your Account",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  verification: async (req, res) => {
    try {
      const { code_otp } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          phoneNumber: req.user.phoneNumber,
        },
        raw: true,
      });

      const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

      if (!isValid) throw `Incorrect OTP Code`;

      await user.update(
        { isVerified: true },
        {
          where: {
            phoneNumber: req.user.phoneNumber,
          },
        }
      );
      res.status(200).send({
        message: "Verification Succes",
        data: isAccountExist,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  changeOtp: async (req, res) => {
    try {
      const { phoneNumber, email } = req.body;

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.update(
        { code_otp: hashOtp },
        {
          where: {
            phoneNumber,
          },
        }
      );

      const isAccountExist = await user.findOne({
        where: {
          phoneNumber,
        },
        raw: true,
      });

      const token = jwt.sign({ phoneNumber, email }, secretKey, {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./src/template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        phoneNumber: isAccountExist.phoneNumber,
        code_otp,
      });

      await transporter.sendMail({
        from: "Only Fresh",
        to: isAccountExist.email,
        subject: "Account Verification",
        html: tempResult,
      });

      res.status(200).send({
        message: "Please check your Email for OTP Code",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { phoneEmail, password, id, isVerified } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          [Op.or]: {
            phoneNumber: phoneEmail ? phoneEmail : "",
            email: phoneEmail ? phoneEmail : "",
            id: id ? id : 0,
          },
        },
        raw: true,
      });

      if (isAccountExist === null) throw "Account not found";
      if (isAccountExist.status === false) throw "Your Account is blocked";

      const payload = {
        phoneNumber: isAccountExist.phoneNumber,
        id: isAccountExist.id,
        isVerified: isAccountExist.isVerified,
      };
      const token = jwt.sign(payload, secretKey);

      const isValid = await bcrypt.compare(password, isAccountExist.password);

      if (!isValid) throw `Password incorrect`;

      res.status(200).send({
        message: "Login Succes",
        isAccountExist,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, secretKey);
      const result = await user.findOne({
        where: {
          phoneNumber: verify.phoneNumber,
          id: verify.id,
        },
        include: [{ model: profile }],
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  changePassword: async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;

      if (password.length < 8)
        throw "Password only valid if length is more than 8";
      if (password !== password_confirmation)
        throw "Password doesnt match with confirm password";
      // const passwordUsed = await bcrypt.compareSync(password);

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      await user.update(
        { password: hashPass },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      res.status(200).send("Update Password Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sendEmailForgotPass: async (req, res) => {
    try {
      const { email, password } = req.body;

      const isAccountExist = await user.findOne({
        where: { email, password },
        raw: true,
      });

      if (isAccountExist === null) throw "Account not found";
      else if (isAccountExist.status === false) throw "Your Account is blocked";

      const token = jwt.sign({ email: isAccountExist.email }, secretKey, {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./src/template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
        link: `${urlReset}/resetPassword/${token}`,
      });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Reset Password",
        html: tempResult,
      });

      res
        .status(200)
        .send(
          "Send email request reset password success, please open your email"
        );
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { name, birthDate, gender } = req.body;

      const data = await user.update(
        {
          name,
        },
        {
          where: { id: req.params.id },
        }
      );
      const data2 = await profile.update(
        {
          gender,
          birthDate,
        },
        {
          where: { UserId: req.params.id },
        }
      );

      res.status(200).send({
        message: "Update success",

        data,
        data2,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updatePass: async (req, res) => {
    try {
      const { password } = req.body;

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.update(
        {
          password: hashPass,
        },
        {
          where: { id: req.params.id },
        }
      );

      res.status(200).send({
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateEmail: async (req, res) => {
    try {
      const { email } = req.body;

      // const code_otp = Math.floor(100000 + Math.random() * 900000).toString();
      // const salt = await bcrypt.genSalt(10);
      // const hashOtp = await bcrypt.hash(code_otp, salt);
      const data = await user.update(
        {
          email,
          // code_otp: hashOtp,
        },
        {
          where: { id: req.params.id },
        }
      );

      // const token = jwt.sign(
      //   { email: email },
      //   "jcwd2204"
      //   // { expiresIn: "1h" }
      // );

      // const tempEmail = fs.readFileSync("./template/codeotp.html", "utf-8");
      // const tempCompile = handlebars.compile(tempEmail);
      // const tempResult = tempCompile({
      //   email,
      //   code_otp,
      // });
      // await transporter.sendMail({
      //   from: "Admin",
      //   to: email,
      //   subject: "Verifikasi akun",
      //   html: tempResult,
      // });
      res.status(200).send({
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const users = await profile.findAll({
        attributes: ["id", "gender", "birthDate"],
        include: user,
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findEmail: async (req, res) => {
    try {
      const users = await user.findAll({
        attributes: ["email"],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findPhoneNumber: async (req, res) => {
    try {
      const users = await user.findAll({
        attributes: ["phoneNumber"],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findById: async (req, res) => {
    try {
      const users = await user.findOne({
        where: { id: req.params.id },
        include: [{ model: profile }],
      });
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      await profile.update(
        {
          profilePic: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            UserId: req.params.id,
          },
        }
      );
      const getProfile = await profile.findOne({
        where: {
          UserId: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        UserId: getProfile.id,
        phoneNumber: getProfile.phoneNumber,
        profilePic: getProfile.profilePic,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
