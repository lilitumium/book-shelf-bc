import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateCommentDto } from '@/dtos/comments.dto';
import CommentsController from '@/controllers/comments.controller';

class CommentsRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public commentsController = new CommentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.commentsController.getAll);
    this.router.get(`${this.path}/:id`, this.commentsController.getOne);
    this.router.post(`${this.path}`, validationMiddleware(CreateCommentDto), this.commentsController.create);
  }
}

export default CommentsRoute;
