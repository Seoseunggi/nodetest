var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app
  .engine('handlebars', handlebars.engine)
  .set('view engine', 'handlebars')
  .set('port', process.env.PORT || 3100)
  .use(express.static(__dirname + '/public'));

//커스텀
var fortunes = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
];

//페이지 라우트
app
  .get('/', function(req, res) {
    res.render('home');
  })
  .get('/about', function(req, res) {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
  });


//404 폴백 핸들러 (미들웨어)
app
  .use(function(req, res, next) {
    res.status(404);
    res.render('404');
  })

//500 dpfj gosemffj (미들웨어)
  .use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
  })

  .listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl+C to terminate.');
  });
