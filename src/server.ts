import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Para capturar erros em funções assíncronas
import cors from 'cors';
import router from './routes';
import path from 'path'


const app = express();

app.use(express.json());
app.use(cors());


app.use(router);

app.use(
  './files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

// Middleware de erro global
// A assinatura correta do middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});


app.listen(3333, () => {
  console.log('Server is Online!!!');
});
