const restify = require('restify');
const logger = require("morgan");
require("./config/database").connect();
require('./middlewares/validate');
const server = restify.createServer();
server.use(logger("dev"))
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.listen(8080, () => {
  console.log(`Server listening on port ${server.address().port}🚀`);
});



// Author routes
const authorController = require('./controllers/author.controller');
const authorSchema=require('./schemas/author.schema');

server.post('/api/author',
validate(authorSchema) ,
restify.plugins.conditionalHandler([
  {
    version: ['1.0.0', '2.0.0'],
    handler: [
      authorController.createAuthor,
      async (req, res) => {
        res.send("TODO");
      }
    ]
  }

])
);
server.get('/api/author', authorController.getAllAuthors);
server.get('/api/author/:id', authorController.getAuthor);
server.put('/api/author/:id', authorController.updateAuthor);
server.del('/api/author/:id', authorController.deleteAuthor);

// Post routes
const postController = require('./controllers/post.controller');
const postSchema=require('./schemas/post.schema');
server.post('/api/post', validate(postSchema), postController.createPost);
server.get('/api/post', postController.getAllPosts);
server.get('/api/post/:id', postController.getPost);
server.put('/api/post/:id', postController.updatePost);
server.del('/api/post/:id', postController.deletePost);

// Comment routes
const commentController = require('./controllers/comment.controller');
const commentSchema = require('./schemas/comment.schema');
server.post('/api/comment', validate(commentSchema),
commentController.createComment,
restify.plugins.conditionalHandler([
  {
    version: ['1.0.0', '2.0.0'],
    handler: [
      (req, res, next) => {
        const post = req.body;
        const validate = ajv.compile(postSchema);
        const valid = validate(post);
        if (valid) return next();
        next({ isValidationError: true, errors: validate.errors });
      },

      async (req, res) => {
        res.send("TODO");
      }
    ]
  }

])
);
server.get('/api/comment', commentController.getAllComments);
server.get('/api/comment/:id', commentController.getComment);
server.put('/api/comment/:id', commentController.updateComment);
server.del('/api/comment/:id', commentController.deleteComment);

