const assert = require('assert');
const User = require('../src/User');

describe('Deleting of records', () => {
  let john;
  beforeEach((done) => {
    john = new User({ name: 'john' });
    john.save().then(() => {
      done();
    });
  });
  it('model instance remove', (done) => {
    john
      .remove()
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method remove', (done) => {
    User.remove({ name: 'john' })
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'john' })
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it('class method findIdAndRemove', (done) => {
    User.findByIdAndRemove(john._id)
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
