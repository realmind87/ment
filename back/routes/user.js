const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const passport = require("passport");
const path = require("path");
const { User, Post, Image } = require("../models");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + "_" + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});


// 회원가입
router.post("/", isNotLoggedIn, upload.none(), async (req, res, next) => {
  try {

    console.log("==========================================");
    console.log(req.body.userid)
    console.log(req.body.image)
    console.log("==========================================");


    const exUser = await User.findOne({
      where: {
        userid: req.body.userid,
      },
    });
    if (exUser) return res.status(403).send("이미 사용중인 아이디 입니다");

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = await User.create({
      userid: req.body.userid,
      nickname: req.body.nickname,
      email: req.body.email,
      password: hashedPassword,
    });

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((src) => Image.create({ src }))
        );
        await user.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await user.addImages(image);
      }
    }

    res.status(200).send("가입 되었습니다.");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  console.log(req.headers);
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: Image,
          }
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
          {
            model: Image,
          },
        ],
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("ok");
});

router.post("/images", upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

module.exports = router;
