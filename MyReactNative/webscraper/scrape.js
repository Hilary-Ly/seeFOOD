const axios = require('axios');
const cheerio = require('cheerio');

export default scrape = async url => {
   const html = await axios.get(url);
   const $ = await cheerio.load(html.data);
   let data = {};
   let ingredients = []
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
        //  quantity: $(elem).find('.recipe-ingredients__ingredient-quantity'),
        //  parts: $(elem).find('.recipe-ingredients__ingredient-parts')
      };
      data.ingredients.each((i, elem) => {
         let ingredient = $(elem).text().trim();
         ingredients.push(ingredient)
      });
   });
   console.log('ingredients', ingredients);
};