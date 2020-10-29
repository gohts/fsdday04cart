// load library
const express = require('express')
const handlebars = require('express-handlebars')

// configure environment
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000;

// create express instance
const app = express();

// configure handlebars
app.engine('hbs',handlebars({defaultLayout: 'default.hbs'}))
app.set('view engine','hbs')

// configure routes
let cartList = [];
let totalCost;

app.get('/', (req,res) => {
    res.status(200);
    res.type('text/html');
    res.render('index',{
        cartList, 
        hasContent: cartList.length > 0,
        totalCost
    });
})


app.post('/', 
    express.urlencoded({extended: true}),
    express.json(),
    (req, res) => {
        console.log(req.body);
        cartList.push({
            item: req.body.item,
            qty: req.body.qty,
            price: req.body.price,
        })
        totalCost = 0;
        cartList.forEach(d => 
            {   
                totalCost += d.qty * d.price;
            }
        );
        res.redirect('/');
    }
)

// load static resources
app.use(express.static(__dirname + '/public'))

// start the app
app.listen(PORT, () => {
    console.log(`Application started on PORT ${PORT} at ${new Date()}`);
})