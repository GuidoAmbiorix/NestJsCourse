import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {PaginationDto} from "../common/dtos/pagination.dto";
import {Auth} from "../auth/decorators";
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Product} from "./entities/product.entity";

@ApiTags('Products')
@Auth()
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiResponse({status:201, description:'Product was created',type:Product})
  @ApiResponse({status:400, description:'Bad request'})
  @ApiResponse({status:403, description:'Token related'})
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch(':id')
  update(@Param('id',ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }
}
