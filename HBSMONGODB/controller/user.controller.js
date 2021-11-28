const {MongoClient, ObjectId} = require("mongodb")
const dbConnection = (callback) =>{
    MongoClient.connect('mongodb://localhost:27017', {}, (err, client)=>{
        if(err) return callback(err, false)
        const dbClient = client.db('users12')
        callback(false, dbClient)
    })
}

const addPost = (req,res) => {
    res.render('addPost', {
        pageTitle:"add new user"
    })
}
const addPostLogic = (req,res) => {
    let user = req.body
    dbConnection((err,client)=>{
        if(err) res.send("database error")
        client.collection("data").insertOne(user, (e, r)=>{
            if(e) res.send("database error")
            res.redirect('/')
        })
    })
}
const showAll = (req,res)=>{
    dbConnection((e, client)=>{
        if(e) res.send("db err")
        client.collection('data').find().toArray((err, data)=>{
            if(err) res.send("db err")
            res.render("showall", {
                pageTitle:"All Users",
                allUsers:data,
                noData: data.length==0? true: false
            })
        })
    })
   
}

const showSingle = (req,res)=>{
    dbConnection((error, client)=>{
        if(error) res.send("db err")
        client.collection("data").findOne({_id: new ObjectId(req.params.id)}, 
        (e,d)=>{
            if(e) res.send("db error")
            if(!d) res.render('err404', {pageTitle:'user not found', err:"invalid user id"})
            res.render("single", { pageTitle:"Single User", user:d })
        
        }
        )
    })
}

const editUser = (req,res)=>{
    dbConnection((err, client) => {
        client.collection('data').findOne({_id: new ObjectId(req.params.id)},
            (e,d)=>{
                if(e) res.send("db error")
                if(!d) res.render('err404', {pageTitle:'user not found', err:"invalid user id"})
                res.render("edit", {
                    pageTitle:"Edit User", user: d
                })
        
        })
    })
}
const editUserLogic = (req,res)=>{
    dbConnection((err, client) => {
        client.collection('data').updateOne({_id: new ObjectId(req.params.id)}, {$set:{...req.body}}, (e, r) => {
            if (e) return res.send(e)
            res.redirect('/')
        })
    })
}

const delAll = (req,res)=>{
    dbConnection((err, client) => {
        if(err) res.send(err)
        client.collection('data').deleteMany({}, (e, r) => {
            if(e) res.send(e)
            console.log(r);
            res.redirect('/')
        })
    })
}

const delSingle = (req,res)=>{
    dbConnection((err, client) => {
        client.collection('data').deleteOne({_id: new ObjectId(req.params.id)})
        .then(res.redirect('/'))
        .catch(e => res.send(e))
    })
}

module.exports = {  addPost,addPostLogic, showAll, showSingle, editUser, editUserLogic, delAll, delSingle }