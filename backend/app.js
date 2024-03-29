import regeneratorRuntime from 'regenerator-runtime';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger.json';
import { REDIRECT_MESSAGE } from './utils/constants';
import routes from './routes';

const app = express();
app.use(cors('*'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (_req, res) => {
  res.send(`Welcome to the Wayfarer API Service. ${REDIRECT_MESSAGE}`);
});

app.use('/', routes);

app.use('*', (_req, res) => {
  res.status(404).send(`404 Page Not Found. ${REDIRECT_MESSAGE}`);
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

export default app;
