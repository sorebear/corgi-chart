import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

// Other db APIs ...
export const setTrelloKey = (id, trelloKey) => (
  db.ref(`users/${id}`).set({
    trelloKey,
  })
);