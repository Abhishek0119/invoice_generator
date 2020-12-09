require('dotenv').config();
const expressEdge= require('express-edge');
const express=require('express');
const edge = require('edge.js');
const cloudinary= require('cloudinary');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession= require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');
const createPostController= require('./controllers/createPost');
const homePageController= require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController= require('./controllers/getPost');
const createUserController= require('./controllers/createUser');
const storeUserController= require('./controllers/storeUser');
const loginController= require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const app= new express();
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true,useUnifiedTopology: true});
app.use(connectFlash());
cloudinary.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_NAME,
});
const mongoStore = connectMongo(expressSession);
app.use(expressSession({
    secret:process.env.EXPRESS_SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection:mongoose.connection
    })
}))
app.use(fileUpload());

app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views',`${__dirname}/views`)
app.use('*',(req,res,next)=>{
    edge.global('auth',req.session.userId)
    next()
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const storePost =require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");
app.get('/',homePageController);
app.get('/auth/register',redirectIfAuthenticated,createUserController);
app.get('/post/new',auth,createPostController);
app.get('/auth/logout',auth,logoutController);
app.post('/posts/store',auth,storePost,storePostController);
app.get('/auth/login',redirectIfAuthenticated,loginController);
app.post('/users/login',redirectIfAuthenticated,loginUserController);
app.get('/post/:id',getPostController);
app.post('/users/register',redirectIfAuthenticated,storeUserController);
app.use((req,res)=> res.render('not-found'));

app.listen(process.env.PORT,()=>{
    console.log(`App is listening at the port ${process.env.PORT}`);
});
