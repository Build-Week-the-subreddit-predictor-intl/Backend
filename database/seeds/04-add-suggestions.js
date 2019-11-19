
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('post_suggestion').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('post_suggestion').insert([
        {id: 1, subreddit_id: 1, post_id:1},
        {id: 2, subreddit_id: 1, post_id:2},
        {id: 3, subreddit_id: 2, post_id:1}
      ]);
    });
};
