import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import TagsController from '@/controllers/tags.controller';

class TagsRoute implements Routes {
  public path = '/tags';
  public router = Router();
  public tagsController = new TagsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tagsController.getAll);
    this.router.get(`${this.path}/latest`, this.tagsController.getLatest);
    this.router.get(`${this.path}/:id`, this.tagsController.getOne);
  }
}

export default TagsRoute;
