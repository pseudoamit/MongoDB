const assert = require('assert');
const User = require('../src/User');

describe('Creating records', () => {
  it('Saving user', (done) => {
    const john = new User({ name: 'John' });
    john.save().then(() => {
      assert(!john.isNew);
      done();
    });
  });
});
