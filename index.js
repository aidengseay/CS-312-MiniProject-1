// imports /////////////////////////////////////////////////////////////////////
import express from "express";
import bodyParser from "body-parser";

// constants ///////////////////////////////////////////////////////////////////
const app = express();
const port = 3000;

// structures //////////////////////////////////////////////////////////////////
function BlogPost(author, title, category, content) {
    this.author = author;
    this.title = title;
    this.category = category;
    this.content = content
    this.time = new Date().toLocaleString("en-US");
}

let blogPosts = [];
let categoryFilter = "None";

// requests ////////////////////////////////////////////////////////////////////

// mount preprocessing middleware
app.use(bodyParser.urlencoded({ extended: true }));

// access static files in public folder
app.use(express.static("public"));

// render the home page
app.get("/", (req, res) => {
    res.render("index.ejs", {blogPosts, categoryFilter});
});

// make a new blog post
app.post("/new", (req, res) => {
    var blogPost = new BlogPost(req.body["author"], req.body["title"],
                                     req.body["category"], req.body["content"]);
    blogPosts.push(blogPost);
    res.redirect("/");
});

// delete a blog post
app.post("/delete", (req, res) => {
    blogPosts.splice(Number(req.body["blogNum"]), 1);
    res.redirect("/");
});

// edit a blog post
app.post("/edit", (req, res) => {
    var blogIndex = Number(req.body["blogNum"]);
    res.render("edit.ejs", {blogPosts, blogIndex});
});

// update the blog post from edit
app.post("/update", (req, res) => {
    blogPosts.splice(Number(req.body["blogNum"]), 1);
    var blogPost = new BlogPost(req.body["author"], req.body["title"],
                                     req.body["category"], req.body["content"]);
    blogPosts.push(blogPost);
    res.redirect("/");
});

// filter blog based on sections
app.post("/filter", (req, res) => {
    categoryFilter = req.body["category"];
    res.redirect("/");
});

// listening log ///////////////////////////////////////////////////////////////
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});

////////////////////////////////////////////////////////////////////////////////