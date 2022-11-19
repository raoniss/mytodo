import express from 'express'
// import bcrypt from 'bcrypt'
const app = express()
const port = process.env.PORT || 3000
// const  saltRounds  =  10 ; 
// const  myPlaintextPassword  =  'Aniss' ; 
// const  someOtherPlaintextPassword  =  'not_bacon' ;


// app.get('/',(req,res)=>{
//     bcrypt . hash ( myPlaintextPassword ,  saltRounds ,  function ( err ,  hash )  { 
//         res.send(`voici le hash de aniss : ${hash}`)
//     } ) ;
// })

app.listen(port, ()=>{
    console.log(` l'application tourne sur le port ${port}`)
    
})

