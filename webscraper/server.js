const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const cors = require('cors');

const scrape = async url => {
   const html = await axios.get(url);
   const $ =  cheerio.load(html.data);
   let data = {};
   let ingredients = [];
   $('body').each((i, elem) => {
      data = {
         title: $(elem)
         .find('.recipe-title h1')
         .text(),
         servings:
         $(elem)
         .find('.recipe-facts__yield')
         .text() ||
         $(elem)
         .find('.recipe-facts__servings')
         .text(),
         ingredients: $(elem).find('.recipe-ingredients__item'),
         directions: $(elem)
         .find('.recipe-directions__steps')
         .text()
      };
      ingredients.push(data.title)
      data.ingredients.each((i, elem) => {
         let ingredient = $(elem)
         .text()
         .trim();
         ingredients.push(ingredient);
      });
   });
   ingredients.push(data.directions)
   console.log('ingredients', ingredients);
   // data cleaning script below are specifically for edamam api 
   // const adjustedIngredients = ingredients.map(ingredient => {
   //    if (isNaN(parseInt(ingredient[0]))) return '1 ' + ingredient
   //    else return ingredient
   // })
   return ingredients;
};

app.use(cors());

app.get('/', function (req, res, next) {
   res.json('server is running')
})

app.post('/scrape/', async function(req, res, next) {
   try {
      console.log('req.query.url', req.query.url);
      const ingredientsArr = await scrape(req.query.url)
      console.log(ingredientsArr);
      res.json(ingredientsArr);
   } catch (error) {
      next(error)
   }
});

const port = 8081
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
