import express from "express";
import bodyParser from "body-parser";
const app =express();
const port = 3000; 

// Data centre
let posts = [];

// post contructor
function Post(title, content, url){
    this.title = title;
    this.content = content;
    this.url = url;
    this.rawDate = new Date();
    this. date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content, url){
    let post = new Post(title,content,url);
    posts.push(post);
}

// Delete Post
function deletePost(index){
    posts.splice(index, 1);
}

// Edit Post
function editPost(index, title, content, url) {
    posts[index] = new Post(title, content, url);
}


// Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

// Home page
app.get("/", (req, res) =>{
    res.render("home.ejs");
});

// Recent post page
app.get("/recent", (req, res) => {
    res.render("posts.ejs", {posts : posts});
});

//Create posts page
app.get("/create", (req, res) =>{
    res.render("create.ejs");
});

// View posts page
app.get("/view/:id",(req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs", {postId : index, title : post.title, content : post.content, url : post.url});
});

// Save post
app.post("/save", (req, res) =>{
    let title = req.body["title"];
    let content = req.body["content"];
    let url = req.body["url"];
    addPost(title, content, url);
    res.redirect("/recent");
});

// Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/recent");
});

// Edit Post page
app.get("/edit/:id", (req, res) =>{
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs", {postId : index, title : post.title, content : post.content, url : post.url});
});

// Update
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let url = req.body["url"];
    let index = req.body["index"];
    editPost(index, title, content, url);
    res.redirect("/recent");
});

// listen things
app.listen(port, () => {
    addPost("Switzerland","Switzerland, federated country of central Europe. Switzerland’s administrative capital is Bern, while Lausanne serves as its judicial centre. Switzerland’s small size—its total area is about half that of Scotland—and its modest population give little indication of its international significance. A landlocked country of towering mountains, deep Alpine lakes, grassy valleys dotted with neat farms and small villages, and thriving cities that blend the old and the new, Switzerland is the nexus of the diverse physical and cultural geography of western Europe, renowned for both its natural beauty and its way of life. Aspects of both have become bywords for the country, whose very name conjures images of the glacier-carved Alps beloved of writers, artists, photographers, and outdoor sports enthusiasts from around the world.","https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTmjaSMS-TS_szvOgbCa217DEZBKwbGOkyiyEOWQP992nQlH1U2UfawX4UGFug4M89L61jdL4R9MqZmBsWj6WAxYyicmV3DS_dptCwRLg");
    addPost("Al Faham","Fahum is an Arabic word for coal and the name comes from this word. Al Faham is basically the Arabian barbecued chicken usually grilled over coal or in oven. Although this dish originated in the Middle East, it is now more popular in India, especially Kerala.","https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/2/14/alfaham.jpg");
    console.log(`Our server successfully loaded on the port no: ${port}.*^*`);
});
