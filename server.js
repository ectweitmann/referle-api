const express = require('express');
const heuristics = require('./wordle_guess_heuristics.json');
const cors = require('cors');
const app = express();
app.use(cors());

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Wordle Guess Heuristics';
app.locals.heuristics = heuristics;

app.get('/', (request, response) => {
  response.send('Oh hey Wordle lovers');
});

app.get('/api/v1/heuristics', (request, response) => {
  let heuristics = app.locals.heuristics;
  // console.log(app.locals.heuristics)
  response.json({ heuristics });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
