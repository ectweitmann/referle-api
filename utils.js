const sortByAvgTileScore = (words) => {
  const fauxWordList = words;
  let sortedFauxWordList = [...fauxWordList];
  return sortedFauxWordList = sortedFauxWordList.sort((a, b) => parseFloat(b['avg_tile_score']) - parseFloat(a['avg_tile_score']))
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
    });
}

const filterByBookmark = (words) => {
  return words.filter(word => word.isBookmarked);
}

const paginateResults = (model, request, response) => {
  const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {}

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit
    }
  }

  results.current = {
    page: page
  }

  if (endIndex < model.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  results.result = model.slice(startIndex, endIndex);
  return results;
}

module.exports = { sortByAvgTileScore, filterByBookmark, paginateResults };
