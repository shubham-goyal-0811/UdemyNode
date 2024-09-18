const fs = require('fs');
const superagent = require('superagent');

const readfilePRO = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                reject('error in reading file');
            }
            resolve(data);
        })
    })
}

const writefilePRO = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) {
                reject('cannot write file');
            }
            resolve('written');
        })
    })
}

const dogpics = async () =>{
    try{
        const data = await readfilePRO(`${__dirname}/dog.txt`);
        console.log(data);
    
        const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`);
        console.log(res.body.message);
    
        await writefilePRO('dog_img.txt', JSON.stringify(res.body.message));
        console.log('Dog images saved');
    }
    catch (err) {
        console.log("error aa gya brother");
        throw(err);
    }
}
dogpics();

// readfilePRO(`${__dirname}/dog.txt`)
//     .then(data => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`)
//     })
//     .then(res => {
//         const images = res.body.message;
//         return writefilePRO('dog_img.txt', images.join('\n'));
//     })
//     .then(() => {
//         console.log('Dog images saved');
//     })
//     .catch(err => {
//         console.log(err);
//     })
