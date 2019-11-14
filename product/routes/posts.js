const router = require("express").Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");
const multer = require("multer");
const ObjectId = require("mongodb").ObjectID;

router.get("/", async (req, res) => {
  /**Symphony setup for chatboat Testing */
  const Symphony = require("symphony-api-client-node");
  const onMessage = messages => {
    messages.forEach(message => {
      console.log(
        'The BOT heard "' +
          message.messageText +
          '" from ' +
          message.user.displayName
      );
    });
  };

  const onError = error => {
    console.error("Error reading data feed", error);
  };

  Symphony.initBot(__dirname + "/config.json").then(() => {
    res.send(__dirname);
    Symphony.getDatafeedEventsService({
      onMessage,
      onError
    });
  });
});

/**Symphony setup for chatboat Testing */

/** Storage Engine */
const storage = multer.diskStorage({
  destination: function(req, file, fn) {
    fn(null, "./public/files");
  },
  filename: function(req, file, fn) {
    fn(null, new Date().getTime().toString() + "-" + file.originalname);
  }
});
const fileFilter = function(req, file, callback) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
/*Image Upload code complete*/

// router.get("/", async (req, res) => {
//   const posts = await Post.find({});
//   res.send(posts);
// });

router.post("/", upload.single("productImage"), async (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  if (req.file) {
    post.path = req.file.path;
  }

  await post.save();
  res.send(post);
});

router.get("/:postId", async (req, res) => {
  const post = await Post.find({ _id: req.params.postId });
  res.send(post);
});

router.put("/:postId", upload.single("productImage"), async (req, res) => {
  //res.send(req.body)
  // const post = await Post.findByIdAndUpdate({
  //     _id :req.params.postId
  // }, req.body,{
  //         new:true,
  //         runValidator :true
  // });
  const path = "";
  if (req.file) {
    path = req.file.path ? req.file.path : "";
  }

  const post = await Post.update(
    { _id: req.params.postId },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        path: path
      }
    }
  );

  res.send(post);
});

router.delete("/:postId", async (req, res) => {
  /**Deleteing Data from post */
  const post = await Post.findByIdAndRemove({
    _id: req.params.postId
  });
  /**Removing Data from comment */
  await Comment.remove({
    post: ObjectId("" + req.params.postId + "")
  });

  res.send(post);
});

/*Create a comment for the post*/
router.post("/:postId/comment", async (req, res) => {
  /* Find a Post */

  const post = await Post.findOne({ _id: req.params.postId });
  /* Create a Post */
  const comment = new Comment();
  comment.content = req.body.content;
  comment.post = post._id;
  await comment.save();
  /* Associate Post with comment */
  post.comments.push(comment._id);
  await post.save();
  res.send(comment);
});

/*Read a comment for the post*/
router.get("/:postId/comment", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    "comments"
  );
  res.send(post);
});

/**Edit a comment */
router.put("/comment/:commentId", async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    {
      _id: req.params.commentId
    },
    req.body,
    { new: true, runValidators: true }
  );
  res.send(comment);
});

router.delete("/comment/:commentId", async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.commentId });
  const postId = comment.post;
  await Post.update(
    { _id: postId },
    { $pull: { comments: req.params.commentId } },
    { multi: true },
    function(err, data) {
      console.log(err, data);
    }
  );
  await Comment.findByIdAndRemove(req.params.commentId);
  res.send({ message: "Comment Successfully Deleted" });
});

module.exports = router;
