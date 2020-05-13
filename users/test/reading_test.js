const assert = require('assert');
const User = require('../src/User');

describe('reading user from database', () => {
  let john;
  beforeEach((done) => {
    john = new User({ name: 'john' });
    john.save().then(() => {
      done();
    });
  });
  it('find all the user with name', (done) => {
    User.find({ name: 'john' }).then((users) => {
      assert(users[0]._id.toString() === john._id.toString());
      done();
    });
  });

  it('find a user by id', (done) => {
    User.findOne({ _id: john._id }).then((user) => {
      assert(user.name === 'john');
      done();
    });
  });
});
