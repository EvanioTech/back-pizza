import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // Para capturar erros em funções assíncronas
import router from './routes';


const app = express();

app.use(express.json());
app.use(router);

// Middleware de erro global
// A assinatura correta do middleware de erro
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
