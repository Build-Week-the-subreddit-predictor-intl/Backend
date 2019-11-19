const db = require('../../database/db-config');
const users = 'users';

const findUsers = (filter) => {
  if (!filter) {
    return db(users).select('id', 'username');
  } else {
    return db(users).where(filter).select('id', 'username');
  }
}

const findUser = (filter) => {
  return db(users).where(filter).first();
}

const addUser = (newUser) => {
  return db(users).insert(newUser).then((ids) => findUser({ id: ids[0] }));
}

const updateUser = (changes, id) => {
  return db(users).where({ id }).update(changes).then(() => findUser({ id }));
}

const removeUser = (id) => {
  return db(users).where({ id }).del();
}

module.exports = {
  findUsers,
  findUser,
  addUser,
  updateUser,
  removeUser
};