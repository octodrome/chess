import { Request, Response } from 'express';

const errorHandler = (error: any, req: Request, res: Response) => {
  res.status(error.status || 500).json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

export default errorHandler;
