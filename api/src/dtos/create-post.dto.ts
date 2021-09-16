import { IsBoolean, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly category: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly isPublished: boolean;
}
