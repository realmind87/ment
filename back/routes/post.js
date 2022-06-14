const express = require("express");
const { Post, User, Comment, Image, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// const multerS3 = require('multer-s3');
// const AWS = require('aws-sdk');

const router = express.Router();


try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

// AWS.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2'
// })

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

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'eastzero-blog-s3',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}_${path.basename(file.originalname)}`)
//     },
//     limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
//   })
// })

router.post("/", isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const hashtags = req.body.hashtags.match(/#[^\s#]+/g);
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id,
    });

    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag)=> Hashtag.findOrCreate({
        where: {name: tag.slice(1).toLowerCase()}
      })));
      await post.addHashtags(result.map(v => v[0]));
    }

    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((src) => Image.create({ src }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ["id", "userid"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: User, // 게시글 작성자
          attributes: ["id", "userid", 'nickname'],
          include: [{
            model: Image
          }]
        },
      ],
    });

    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/detail", async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: parseInt(req.query.postId),
      include: [
        {
          model: User,
          attributes: ["id", "userid", 'nickname'],
          include: [{
            model: Image
          }]
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "userid"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
        {
          model: Hashtag,
        },
        {
          model: Image,
        },
      ],
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/comment", async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      where: {
        PostId: parseInt(req.query.postId, 10),
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "userid"],
        },
      ],
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 게시글입니다.");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "userid"],
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post =  await Post.findOne({ where : { id: req.params.postId } })
    if (!post) return res.status(403).send('게시글이 존재하지 않습니다.')
    await post.addLikers(req.user.id)
    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post =  await Post.findOne({ where : { id: req.params.postId } })
    if (!post) return res.status(403).send('게시글이 존재하지 않습니다.')
    await post.removeLikers(req.user.id)

    res.json({ PostId: post.id, UserId: req.user.id })
  } catch (error) {
    console.error(error)
    next(error)
  }

})


router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user.id,
      },
    });
    res.json({ PostId: req.params.postId });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/images", isLoggedIn, upload.array("image"), (req, res, next) => {
  console.log(req.files);
  res.json(req.files.map((v) => v.filename));
});

module.exports = router;
