const assert = require('assert');
const User = require('../src/User');

describe('Subdocument', () => {
  it('can create a subdocument', (done) => {
    const john = new User({
      name: 'john',
      posts: [{ title: 'Post Title' }],
    });
    john
      .save()
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  it('can add a subdocumnt to an existing user', (done) => {
    const john = new User({ name: 'john', posts: [] });
    john
      .save()
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('can remove a existing subdocument', (done) => {
    const john = new User({ name: 'john', posts: [{ title: 'New Post' }] });
    john
      .save()
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        const post = user.posts[0];
        post.remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'john' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
