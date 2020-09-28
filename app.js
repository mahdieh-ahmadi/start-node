var item = require('node-persist');
 item.initSync();

function setAcconts(accont) {
    let acconts = item.getItemSync('acconts');
    if (typeof acconts === "undefined") {
        acconts = [];
    }
    acconts.push(accont);
     item.setItemSync('acconts', acconts);
}

const getAcconts = accontName => {
    const acconts = item.getItemSync('acconts')
    let itemFind;
    acconts.forEach(element => {
        if(element.name === accontName){
            itemFind = element
        }
    });
    console.log(itemFind)
    return itemFind
}

setAcconts({
    name : 'Facebook',
    userName : 'test@gmail.com',
    password : 123456
})
setAcconts({
    name : 'telegram',
    userName : 'mahdie-ahmadi',
    password : 987654
})
getAcconts('Facebook')