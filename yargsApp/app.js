const yargs = require('yargs')
const utils = require('./utils/myFunctions')

// Add User
yargs.command({
    command: 'addUser',
    describe: 'Command to add user',
    builder:{
        name: {type: "string", demandOption: true},
        email: {type: "string", demandOption: true}
    },
    handler: function(argv){
        let user = {
            name: argv.name,
            email: argv.email
        }
        utils.addUser(user)
    }
})

// Show All Users
yargs.command({
    command: 'showAll',
    describe: 'Command to show all user',
    handler: function(){
        utils.showAllUsers()
    }
})

// Show Single User
yargs.command({
    command: 'showSingle',
    describe: 'Command to show single user',
    builder:{
        type: {type: 'string', demandOption: true},
        value: {type: 'string', demandOption: true}
    },
    handler: function(argv){
        utils.showSingleUser(argv.type, argv.value)
    }
})

// Edit User
yargs.command({
    command: 'editUser',
    describe: 'Command to edit user',
    builder:{
        typeOfSearch: {type: 'string', demandOption: true},
        valueOfSearch: {type: 'string', demandOption: true},
        typeOfEdit: {type: 'string', demandOption: true},
        valueOfEdit: {type: 'string', demandOption: true}
    },
    handler: function(argv){
        utils.editUser(argv.typeOfSearch, argv.valueOfSearch, argv.typeOfEdit, argv.valueOfEdit)
    }
})

// Delete User
yargs.command({
    command: 'delUser',
    describe: 'Command to delete user',
    builder:{
        id: {type: 'string', demandOption:true}
    },
    handler: function(argv){
        utils.deleteUser(argv.id)
    }
})

yargs.argv