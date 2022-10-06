import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiPropertyOptional()
  @MaxLength(150)
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @Min(1.0)
  @IsNotEmpty()
  @IsDefined()
  price: number;

  @ApiProperty()
  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  sku: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  published?: boolean;
}
