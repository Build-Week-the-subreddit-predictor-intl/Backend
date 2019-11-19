
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('subreddits').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('subreddits').insert([
        {id: 1, subreddit_name: 'rowValue1'},
        {id: 2, subreddit_name: 'rowValue2'},
        {id: 3, subreddit_name: 'rowValue3'}
      ]);
    });
};
