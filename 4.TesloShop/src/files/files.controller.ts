import {Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { FilesService } from './files.service';
import {FilesInterceptor} from "@nestjs/platform-express";
@Controller('files')
export class FilesController {
  
  constructor(private readonly filesService: FilesService) {}
  
  @Post('product')
  @UseInterceptors(FilesInterceptor('file'))
  uploadProductFile(@UploadedFiles() file:Express.Multer.File){
    return file;
  }

}
