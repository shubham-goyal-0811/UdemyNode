const fs = require('fs'); 
const http = require('http'); 
const url = require('url');
const slugify = require('slugify');
const PORT = 3000;

const tempoverview = fs.readFileSync(`${__dirname}/template/overview.html`,'utf-8');
const tempcard = fs.readFileSync(`${__dirname}/template/card.html`,'utf-8');
const temproduct = fs.readFileSync(`${__dirname}/template/product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);
const slug = dataObject.map(el => slugify(el.productName, {lower : true}));

const replaceTemplate = (temp, product) =>{
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
}

const server = http.createServer((req,res) => {

    const {query, pathname} = url.parse(req.url, true);
    
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{
            'Content-type':'text/html'
        });
        const cardsHtml = dataObject.map(el => replaceTemplate(tempcard, el)).join('');
        const output =  tempoverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    else if(pathname === '/product'){
        res.writeHead(200,{
            'Content-type':'text/html'
        });
        const product = dataObject[query.id];
        const output = replaceTemplate(temproduct, product);
        res.end(output);
    }
    else if(pathname === '/api'){
        res.writeHead(200,{
            'Content-type':'application/json'
        });
        res.end(data);
    }
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        });
        res.end('WRONG URL');
    }
});

server.listen(PORT,'127.0.0.1',() => {
    console.log(`Server Started at ${PORT}`); 
});