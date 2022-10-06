import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, Product } from '@prisma/client';
import { Transform } from 'class-transformer';

export class ProductEntity implements Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description: string;

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: Number })
  price: Prisma.Decimal;

  @ApiProperty()
  sku: string;

  @ApiProperty({ default: false })
  published: boolean;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}
