const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { or, and, like } = Op;
const { Post, Image, User, Comment } = require("../models");
const { isLoggedIn } = require("./middlewares");

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "userid"],
        },
        {
          model: Image,
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 검색
router.get("/search", async (req, res, next) => {
  try {
      const keyword = req.query.keyword;
      const searchDiary = await Post.findAll({
        where: {
          [or]: [
            { title: {[like]: `%${keyword}%`}}, 
            { content: {[like]: `%${keyword}%`}}
          ]
        },
        include: [{
          model: Image,
        }],
      })
      if (searchDiary.length === 0) return res.status(401).json({message: '검색과 일치하는 내용의 일기가 없습니다.'})
      res.status(200).json(searchDiary);
  } catch (error) {
      console.error(error);
      next(error);
  }
});

module.exports = router;
