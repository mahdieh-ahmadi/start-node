const storage = require('node-persist');
const crypto = require('crypto-js')

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
            type : 'string'
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
        },
        password:{
            demand : true,
            alias : 'p',
            description : 'enter the password to get accont',
            type : 'string'
        }
    })
})
.help('help')
.argv;

let command = argv._[0];
storage.initSync();

const cryptMassage = crypto.AES.encrypt(argv.password , argv.password).toString()

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

    if(typeof itemFind !== 'undefined'){
    const bytes = crypto.AES.decrypt(itemFind.password , argv.password)
    const check = bytes.toString(crypto.enc.Utf8)
    if( check !== ''){
        itemFind.password = check
        return itemFind
    }else{
        return undefined
    }}else{
        return undefined
    }
    
}


if(command === 'set'){
        let accont = setAcconts({
        name: argv.name,
        username : argv.username,
        password : cryptMassage 
    })
    console.log('accont added')
    console.log(accont)
}else if(command === 'get'){

    const itemFind = getAcconts(argv.name)
    if(typeof itemFind === 'undefined'){
        console.log('accont not found!')
    }else{
        console.log('accont found!')
        console.log(itemFind)
    }
}

