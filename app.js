const storage = require('node-persist');
const argv = require('yargs')
.command('set' , 'add accont' , item => {
    item.options({
        name:{
            demand : true,
            alias : 'n',
            description : 'your name is here',
            type : 'string'
        },
        username:{
            demand : true,
            alias : 'u',
            description : 'your username is here',
            type : 'string'
        },
        password:{
            demand : true,
            alias : 'p',
            description : 'your password is here',
            type : 'number'
        }
    }).help('help')
})
.command('get' , 'get accont' , nameAccont => {
    nameAccont.options({
        name:{
            demand : true,
            alias : 'n',
            description : 'enter the name of accont for find accont details',
            type : 'string'
        }
    })
})
.help('help')
.argv;

let command = argv._[0];
storage.initSync();

const setAcconts = accont => {
    let acconts = storage.getItemSync('acconts');
    if (typeof acconts === "undefined") {
        acconts = [];
    }
    acconts.push(accont);
    storage.setItemSync('acconts', acconts);
    return accont
}

const getAcconts = accontName => {
    const acconts = storage.getItemSync('acconts')
    let itemFind;
    acconts.forEach(element => {
        if(element.name === accontName){
            itemFind = element
        }
    });
    if(typeof itemFind === 'undefined'){
        console.log('accont not found!')
    }else{
        console.log('accont found!')
        console.log(itemFind)
    }
}


if(command === 'set'){
    let accont = setAcconts({
        name: argv.name,
        username : argv.username,
        password : argv.password
    })
    console.log('accont added')
    console.log(accont)
}else if(command === 'get'){
    getAcconts(argv.name)
}

