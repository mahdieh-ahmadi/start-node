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
        },
        masterPass:{
            demand : true,
            alias : 'm',
            description : 'master password is here',
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
        masterPass:{
            demand : true,
            alias : 'm',
            description : 'master password is here',
            type : 'string'
        }
    })
})
.help('help')
.argv;

let command = argv._[0];
storage.initSync();

const fetchacconts = pass => {
    let acconts = storage.getItemSync('acconts');
    if (typeof acconts === "undefined") {
        acconts = [];
    }else{
        const bytes = crypto.AES.decrypt(acconts , pass)
        acconts =JSON.parse(bytes.toString(crypto.enc.Utf8)) 
    }
    return acconts

}

const saveAccont = (acconts , pass) => {
    console.log('save')
    const accontsSave = crypto.AES.encrypt(JSON.stringify(acconts)  , pass).toString()
    console.log('accont save = ' + accontsSave)
    storage.setItemSync('acconts', accontsSave);
}

const setAcconts = accont => {
    let acconts = fetchacconts(argv.masterPass)
    
    acconts.push(accont);
    saveAccont(acconts , argv.masterPass)
    return accont
}

const getAcconts = accontName => {
    const acconts = fetchacconts(argv.masterPass)
    let itemFind;
    acconts.forEach(element => {
        if(element.name === accontName){
            itemFind = element
        }
    });

    if(typeof itemFind !== 'undefined'){
        return itemFind
    }else{
        return undefined
    }
    
}


if(command === 'set'){
     try   { let accont = setAcconts({
        name: argv.name,
        username : argv.username,
        password : argv.password
    })
    console.log('accont added')
    console.log(accont)} catch (error) {
         console.log('set accont failed')
    } 
}else if(command === 'get'){

    try{const itemFind = getAcconts(argv.name)
    if(typeof itemFind === 'undefined'){
        console.log('accont not found!')
    }else{
        console.log('accont found!')
        console.log(itemFind)
    }}catch (error){
        console.log('get accont failed!')
    }
}

