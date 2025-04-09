const { Router } = require('express');
const Word = require('../model/word');

const router = Router();

router.get('/words', async (req, res, next) => {
    let words = await Word.find();
    if(words.length == 0){
        words = [{word: 'START', date: new Date()}];
        console.log(words);
        
    }
    res.json({msg: 'Fetched Words', words: words})
})

router.post('/word', async (req, res, next) => {
    const { word } = req.body;

    const newWord = new Word({
        word: word,
        date: new Date()
    })
    await newWord.save();
    res.status(201).json({msg: 'Word Saved', word: newWord})
})

module.exports = router;
