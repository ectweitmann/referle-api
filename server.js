const express = require('express');
const { sortByAvgTileScore, filterByBookmark, paginateResults } = require('./utils.js');
const heuristics = require('./wordle_guess_heuristics.json');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.set('port', process.env.PORT || 3010);
app.locals.title = 'Referle Database';
app.locals.heuristics = heuristics;

app.get('/api/v1/heuristics/sorted/avg_tile_score', (request, response) => {
  const sortedHeuristics = sortByAvgTileScore(app.locals.heuristics);
  const results = paginateResults(sortedHeuristics, request, response);
  response.status(200).json(results);
});

app.get('/api/v1/heuristics/bookmarked', (request, response) => {
  const filteredHeuristics = filterByBookmark(app.locals.heuristics);
  const results = paginateResults(filteredHeuristics, request, response);
  response.status(200).json(results);
});

app.patch('/api/v1/heuristics/:id', (request, response) => {
  const heuristics = app.locals.heuristics;
  const index = heuristics.findIndex(word => `${word.id}` === request.params.id)
  if (index === -1) {
    return response.sendStatus(404)
  }
  heuristics[index].isBookmarked = request.body.isBookmarked;
  response.status(200).json(heuristics[index]);
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
