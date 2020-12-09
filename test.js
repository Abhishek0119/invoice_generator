const mongoose=require('mongoose');

const post= require('./database/models/post');


mongoose.connect('mongodb://localhost/node-js-test-blog',{useNewUrlParser: true,useUnifiedTopology: true});


post.find({},(err,post)=>{
      console.log(err,post);
})
/*post.findById( "5f20e96dc46eda0724fb8ae5",(err,post)=>{
     console.log(err,post);
})*/
/*post.findByIdAndUpdate("5f20e96dc46eda0724fb8ae5",{
    title:"My updated title for the second post"
},(err,post)=>{
   console.log(err,post);
})*/

/*post.create({
    title:"My second blog",
    description:"second blog description",
    content:"This is about the second node blog"
},(err,post)=>{
    console.log(err,post);
})*/