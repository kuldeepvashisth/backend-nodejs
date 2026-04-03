//Core Modules
const express=require('express');
const path=require('path');

//custom modules
const {userRouter}=require('./routes/userRoutes')
const Home=require('./Model/modelsHome')
const hostrouter=require('./routes/hostRoutes');
const rootdir=require('./utils/path')


const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views'); //vo folder jha saari files de rkhi hai html ki
//app.use('/user',userRouter)

app.get("/",async (req,res,next)=>{
    /*similarly can use this rootdir everywhere ,jisse 
    har-baar relative path nidena pdega ,hmme sirf main file ka path change krna hoga
       
    res.sendFile(path.join(rootdir,'views','home.html'))
       this is for static UI
    */
   const registeredhouse=await Home.fetchAll();
        console.log('app.js',registeredhouse);
res.render('home',{registeredhouse:registeredhouse,pageTitle:'airbnb home',});
    })

    //to allow server to access our local file like css
app.use(express.static(path.join(rootdir,'public')));
app.use(express.urlencoded({ extended: true }))
app.use( userRouter)
// app.use('/host',hostrouter)
app.use(hostrouter)

app.use((req,res,next)=>{
res.status(404).render('404')
})



app.listen(3001,()=>{
    console.log("airbnb starting");
})
