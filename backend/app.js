import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const message = `Please checkout the
https://komsic-wayfarer.herokuapp.com/api-docs to know how to consume the API.
You can also checkout the project repo at https://github.com/komsic/WayFarer.
Thanks`;

app.get('/', (req, res) => {
  res.send(`Welcome to the Wayfarer API Service. ${message}`);
});

app.use('*', (req, res) => {
  res.status(404).send(`404 Page Not Found. ${message}`);
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

export default app;
