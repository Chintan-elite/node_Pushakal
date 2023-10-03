const yargs = require("yargs")



yargs.command({
    command:"add",
    builder : {
        name : {
            type:String
        },
        email : {
            type : String
        }
    },
    handler : function(argv)
    {
        console.log("add calling");
        console.log(argv.name+" "+argv.email);
    }
})

yargs.command({
    command:"remove",
    handler : function(argv)
    {
        console.log("remove calling");
    }
})


yargs.argv