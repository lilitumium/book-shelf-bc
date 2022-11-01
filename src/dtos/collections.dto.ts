import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  public title: string;

  @IsString()
  public thumbnail?: string;

  @IsNumber()
  public creatorId?: number;

  @IsArray()
  public bookIds: Array<number>;
}
