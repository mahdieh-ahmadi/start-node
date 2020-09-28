const storage = require('node-persist');
const argv = require('yargs')
.command('hello' , 'add accont' , item => {
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
.help('help')
.argv;


 storage.initSync();

function setAcconts(accont) {
    let acconts = storage.getItemSync('acconts');
    if (typeof acconts === "undefined") {
        acconts = [];
    }
    acconts.push(accont);
     storage.setItemSync('acconts', acconts);
}

const getAcconts = accontName => {
    const acconts = storage.getItemSync('acconts')
    let itemFind;
    acconts.forEach(element => {
        if(element.name === accontName){
            itemFind = element
        }
    });
    console.log(itemFind)
    return itemFind
}


if(argv._[0] === 'hello' && 
typeof argv.name === "string" && 
typeof argv.username === "string" &&
typeof argv.password === 'number'){
    setAcconts({
        name: argv.name,
        username : argv.username,
        password : argv.password
    })
}
getAcconts('Facebook')
console.log(storage.getItemSync('acconts'))