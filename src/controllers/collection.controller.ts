import { NextFunction, Request, Response } from 'express';
import { CreateCollectionDto } from '@/dtos/collections.dto';
import CollectionsService from '@/services/collections.service';

class CollectionsController {
  public collectionsService = new CollectionsService();

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const collectionData: CreateCollectionDto = req.body;

      const collection = await this.collectionsService.createCollection(collectionData);
      res.status(201).json({ data: collection, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const collections = await this.collectionsService.getAllCollections();

      res.status(200).json({ data: collections, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getLatest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const collections = await this.collectionsService.getLatestCollections();

      res.status(200).json({ data: collections, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const collectionId = Number(req.params.id);
      const collection = await this.collectionsService.getCollectionById(collectionId);

      res.status(200).json({ data: collection, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCollection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const collectionId = Number(req.params.id);
      const collection = await this.collectionsService.deleteCollectionById(collectionId);

      res.status(200).json({ data: collection, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default CollectionsController;
