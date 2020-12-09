const path= require('path');
const cloudinary = require('cloudinary');
const Post = require('../database/models/post');

module.exports= (req,res)=>{
    const {image}= req.files;
    const uploadPath=path.resolve(__dirname,'..','public/posts',image.name);
    image.mv(uploadPath,(error)=>{
        cloudinary.v2.uploader.upload(uploadPath,(err,result)=>{
            if(err)
            {
                return res.redirect('/');
            }
            Post.create({
                ...req.body,
                image:result.secure_url,
                author:req.session.userId
            },(err,post)=>{
                console.log(post);
                res.redirect('/')
            })
        })
    })
}