const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

//  Usando middleware
// const logMiddleware = (req, res, next) => {
//   console.log(
//     `HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`
//   );
//   next();
// };

// app.use(logMiddleware);

// app.get("/", logMiddleware, (req, res) => {
//   res.send("Home");
// });

// Pegando como parâmetro na url
// app.get("/login/:name", (req, res) => {
//   res.send(`Bem-vindo, ${req.params.name}`);
// });

// Pegando como query string
// app.get("/login", (req, res) => {
//   res.send(`Bem-vindo, ${req.query.name}`);
// });

const checkAgeQueryParam = (req, res, next) => {
  const { age } = req.query

  if (!age) {
    return res.redirect('/')
  }
  next()
};

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/check', (req, res) => {
  const { age } = req.body

  if (age > 18) {
    res.redirect(`major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', ageMiddleware, (req, res) => {
  res.render('major', { age: req.query.age })
})

app.get('/minor', ageMiddleware, (req, res) => {
  res.render('minor', { age: req.query.age })
})

app.listen(3000)
