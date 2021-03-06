const assert = require('assert');
const User = require('../src/User');

describe('Validating records', () => {
  it('Requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
  });
  //   it('Requires a user name longer than 2 character', () => {
  //     const user = new User({ name: 'arm' });
  //     const validationResult = user.validateSync();
  //     const { message } = validationResult.errors.name;
  //     assert(message === 'Name must be longer than 2 character');
  //   });
});
