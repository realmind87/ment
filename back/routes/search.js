const express = require("express");
const { Post } = require("../models");
const router = express.Router();

// 검색
router.get("/search", async (req, res, next) => {
    try {
        const keyword = req.query.search
        const searchDiary = await Post.findAll({
            where: {
                [and]: [
                    {private: false }
                ], 
                [or]: [{
                        title: { 
                            [like]: `%${keyword}%`
                        }
                    },{ 
                        content: { 
                            [like]: `%${keyword}%` 
                        }
                    }]
            },
        })
        if (searchDiary.length === 0) return res.status(401).json({message: '검색과 일치하는 내용의 일기가 없습니다.'})
        res.status(200).json(searchDiary);
    } catch (error) {
        console.error(error);
        next(error);
    }
});