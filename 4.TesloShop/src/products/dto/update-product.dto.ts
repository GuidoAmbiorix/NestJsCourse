// import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {PartialType} from "@nestjs/swagger";

export class UpdateProductDto extends PartialType(CreateProductDto) {}
