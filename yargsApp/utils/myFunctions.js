const fs = require('fs')
const chalk = require('chalk')
const uniqid = require('uniqid')
const validator = require('validator')

const writeData = (users) => {
    fs.writeFileSync("users.json", JSON.stringify(users))
}

const readData = () =>{
    let data 
    try {
        data = JSON.parse(fs.readFileSync("users.json").toString())
        if(!Array.isArray(data)) throw new Error
    } catch (e) {
        data = []
    }
    return data
}

const addUser = (userData) => {
    try {
        if (!validator.isEmail(userData.email)) throw new Error('Invalid email')
        const allUsers = readData()
        const notUnique = allUsers.find(user => user.email == userData.email)
        if(notUnique) throw new Error('Email already in use')
        let user = {
            id: uniqid(),
            ...userData
        }
        allUsers.push(user)
        writeData(allUsers)
        console.log(chalk.green('Added succesfully'))
    } catch (e) {
        console.log(chalk.red(e))
    }
}

const showAllUsers = () => {
    try {
        const allUsers = readData()
        if(allUsers.length == 0) throw new Error('There is no users')
        console.log(`You have ${allUsers.length} record in this file`)
        allUsers.forEach(user => {
            console.log(chalk.cyan(`ID: ${user.id} ----- UserName: ${user.name} ----- Email: ${user.email}`))
        })
    } catch (e) {
        console.log(chalk.red(e))
    }
}

const showSingleUser = (type, value) => {
    try {
        console.log(value, type)
        if(type != 'id' && type != 'email') throw new Error('The type should be id or email')
        const allUsers = readData()
        const user = allUsers.find(user => user[type] == value)
        console.log(user)
        if(!user) throw new Error('User not found')
        console.log(chalk.magenta(user.id), chalk.blue(user.name), chalk.blue(user.email))
    } catch (e) {
        console.log(chalk.red(e))
    }
}

const editUser = (typeOfSearch, valueOfSearch, typeOfEdit, valueOfEdit) => {
    try {
        if(typeOfSearch != 'id' && typeOfSearch != 'email') throw new Error('This type of search is not supported')
        if(typeOfEdit != 'name' && typeOfEdit != 'email') throw new Error('This type of edit is not supported')
        const allUsers = readData()
        if(typeOfEdit == 'email'){
            if(!validator.isEmail(valueOfEdit)) throw new Error ('Please enter a valid email')
            const emailExist = allUsers.find(user => user.email == valueOfEdit)
            if(emailExist) throw new Error('Email already in use')
        }
        const user = allUsers.find(user => user[typeOfSearch] == valueOfSearch)  
        user[typeOfEdit] = valueOfEdit
        fs.writeFileSync("users.json", JSON.stringify(allUsers))
        console.log(chalk.green('Succesfully Edited'));
    } catch (e) {
        console.log(chalk.red(e))
    }
}

const deleteUser = (id) => {
    try {
        const allUsers = readData()
        const newUsers = allUsers.filter(user=> user.id != id)
        if(newUsers.length == allUsers.length) throw new Error('Check the id again')
        writeData(newUsers)
        console.log(chalk.green('Deleted successfuly'))
    } catch (e) {
        console.log(chalk.red(e))
    }
}



module.exports = {
    addUser,
    showAllUsers,
    showSingleUser,
    deleteUser,
    editUser
}