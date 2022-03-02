const express = require('express');
const heuristics = require('./wordle_guess_heuristics.json');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3010);
app.locals.title = 'Referle Database';
app.locals.heuristics = heuristics;

app.get('/', (request, response) => {
  response.send('Oh hey Wordle lovers');
});

app.get('/api/v1/heuristics/sorted/avg_tile_score', (request, response) => {
  console.log('REQUEST BEGINS --------->', request.route.path, '<---------- REQUEST ENDS');
  const heuristics = app.locals.heuristics;
  let sortedHeuristics = [...heuristics];
    sortedHeuristics = sortedHeuristics.sort((a, b) => parseFloat(b['avg_tile_score']) - parseFloat(a['avg_tile_score']))
      .filter(word => {
        let index = 0;
        let result = true;
        for( const letter of word.guess) {
          if (word.guess.indexOf(letter) !== index) {
            result = false;
            break;
          }
          index++;
        }
        return result;
      })
  response.status(200).json(sortedHeuristics);
});

app.get('/api/v1/heuristics/bookmarked', (request, response) => {
  const  heuristics = app.locals.heuristics;
  const bookmarkedWords = heuristics.filter(word => word.isBookmarked);
  response.staus(200).json(bookmarkedWords);
})

app.patch('/api/v1/heuristics/:id', (request, response) => {
  const heuristics = app.locals.heuristics;
  const index = heuristics.findIndex(word => word.id = request.params.id)
  if (index === -1) {
    return response.sendStatus(404)
  }
  heuristics[index].isBookmarked = request.body.isBookmarked;
  response.status(200).json(heuristics[index]);
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
