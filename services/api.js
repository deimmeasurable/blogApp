app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    User.findOne({ where: { username } })
      .then(user => {
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).json({ error: 'Invalid username or password' });
        }
  
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
        res.json({ token });
      })
      .catch(err => {
        console.error('Error retrieving user:', err);
        res.sendStatus(500);
      });
  });
  
  app.get('/posts', authenticateToken, (req, res) => {
    Post.findAll({ where: { author: req.user.username } })
      .then(posts => res.json(posts))
      .catch(err => {
        console.error('Error retrieving posts:', err);
        res.sendStatus(500);
      });
  });

  app.post('/posts', authenticateToken,(req, res) => {
    const { title, content } = req.body;
    
    Post.create({ title, content, author: req.user.username })
    .then(post => res.status(201).json(post))
    .catch(err => {
    console.error('Error creating post:', err);
    res.sendStatus(500);
    });
    });
    
    app.put('/posts/:id', authenticateToken, (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
    
    Post.findOne({ where: { id: postId, author: req.user.username } })
    .then(post => {
    if (!post) {
    return res.status(404).json({ error: 'Post not found' });
    }
    
    post.title = title;
    post.content = content;
    return post.save();
  })
  .then(updatedPost => res.json(updatedPost))
  .catch(err => {
    console.error('Error updating post:', err);
    res.sendStatus(500);
  });
  
  });
  
  app.delete('/posts/:id', authenticateToken, (req, res) => {
  const postId = req.params.id;
  
  Post.destroy({ where: { id: postId, author: req.user.username } })
  .then(deletedRows => {
  if (deletedRows === 0) {
  return res.status(404).json({ error: 'Post not found' });
  }
  post.title = title;
  post.content = content;
  return post.save();
})
.then(updatedPost => res.json(updatedPost))
.catch(err => {
  console.error('Error updating post:', err);
  res.sendStatus(500);
});

});

app.delete('/posts/:id', authenticateToken, (req, res) => {
const postId = req.params.id;

Post.destroy({ where: { id: postId, author: req.user.username } })
.then(deletedRows=> {
if (deletedRows === 0) {
return res.status(404).json({ error: 'Post not found' });
}
})
})
