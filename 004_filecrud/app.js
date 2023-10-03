const yargs = require("yargs")
const file = require("./file")

yargs.command({
    command:"create",
    builder : {
        name : {
            type:String
        },
        email:{
            type : String
        }
    },
    handler : function(argv)
    {
        const data = {
            name : argv.name,
            email : argv.email
        }
        file.createFile(data)
    }
})


yargs.command({
    command:"view",
    handler : function(argv){
        file.viewFile()
    }
})

yargs.command({
    command:"remove",
    builder : {
        name : {
            type : String
        }
    },
    handler : function(argv)
    {
        file.removedata(argv.name)
    }
})

yargs.argv