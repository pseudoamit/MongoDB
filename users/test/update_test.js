const assert = require('assert');
const User = require('../src/User');

describe('Updating user record', () => {
  let john;
  beforeEach((done) => {
    john = new User({ name: 'john', likes: 0 });
    john.save().then(() => {
      done();
    });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((user) => {
        assert(user.length === 1);
        assert(user[0].name == 'Alex');
        done();
      });
  }

  it('instance save and save', (done) => {
    john.set('name', 'Alex');
    assertName(john.save(), done);
  });

  it('A model instance can update', (done) => {
    assertName(john.update({ name: 'Alex' }), done);
  });

  it('A model class can update', (done) => {
    assertName(User.update({ name: 'john' }, { name: 'Alex' }), done);
  });
  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'john' }, { name: 'Alex' }), done);
  });
  it('A model class can update by Id', (done) => {
    assertName(User.findByIdAndUpdate(john._id, { name: 'Alex' }), done);
  });

  it('Updating a post count by one', (done) => {
    User.update({ name: 'john' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});
