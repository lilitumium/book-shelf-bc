import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CollectionController from '@controllers/collection.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateCollectionDto } from '@/dtos/collections.dto';

class CollectionRoute implements Routes {
  public path = '/collections';
  public router = Router();
  public collectionController = new CollectionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateCollectionDto, 'body'), this.collectionController.create);
    this.router.get(`${this.path}`, this.collectionController.getAll);
    this.router.get(`${this.path}/latest`, this.collectionController.getLatest);
    this.router.get(`${this.path}/:id`, this.collectionController.getOne);
    this.router.delete(`${this.path}/:id`, this.collectionController.deleteCollection);
  }
}

export default CollectionRoute;
