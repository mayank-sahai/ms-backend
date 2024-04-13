import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

// set security headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/ping', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`);
});
