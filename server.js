const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');

const app = express();
const upload = multer();

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' })); // dane pliki o rozszerzeniu .hbs powinny byc renderowane przez dany silnik hbs
app.set('view engine', '.hbs'); // informacja o rozszerzeniu wykorzystywanych plikow


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});


app.post('/contact/send-message', upload.single('uploaded_image'), (req, res) => {

  const { author, sender, title, message } = req.body;
  const image = req.file;

  if (author && sender && title && message && image) {
    res.render('contact', { isSent: true, imageName: image.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }

});


app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
