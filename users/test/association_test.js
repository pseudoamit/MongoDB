const mongoose = require('mongoose');
const BlogPost = require('../src/BlogPost');
const User = require('../src/User');
const Comment = require('../src/Comment');

describe('Association', () => {
  let john, blogPost, comment;
  beforeEach((done) => {
    john = new User({ name: 'john' });
    blogPost = new BlogPost({
      title: 'Blog post title',
      content: 'blog post content',
    });
    comment = new Comment({ content: 'This is a great post' });

    john.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = john;

    Promise.all([john.save(), blogPost.save(), comment.save()]).then(() =>
      done()
    );
  });

  it.only('Save a relation between user and blogpost', (done) => {
    User.findOne({ name: 'john' }).then((user) => {
      console.log(user);
      done();
    });
  });
});
