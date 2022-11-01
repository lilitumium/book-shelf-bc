import { Tag, PrismaClient } from '@prisma/client';
import { HttpException } from '@/exceptions/HttpException';

class TagsService {
  public tags = new PrismaClient().tag;

  public async getAllTags(): Promise<Array<Tag>> {
    const tags = await this.tags.findMany();

    return tags;
  }

  public async getLatestTags(): Promise<Array<Tag>> {
    const tags = await this.tags.findMany({ take: 10, orderBy: { createdAt: 'desc' } });

    return tags;
  }

  public async getTagById(tagId: number): Promise<Tag> {
    const tag = await this.tags.findUnique({ where: { id: tagId } });

    if (!tag) throw new HttpException(409, 'Tag not found');

    return tag;
  }
}

export default TagsService;
