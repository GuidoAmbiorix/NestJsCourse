import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  BadRequestException, UploadedFile
} from '@nestjs/common';
import { FilesService } from './files.service';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {fileFilter, fileNamer} from "./helpers";
@Controller('files')
export class FilesController {
  
  constructor(private readonly filesService: FilesService) {}
  
  @Post('product')
@UseInterceptors(FileInterceptor('file'
    ,{fileFilter:fileFilter,
      storage:diskStorage({destination:'./static/products', filename:fileNamer})
   })
   )
  uploadProductFile(@UploadedFile() file:Express.Multer.File){
    if(!file){
      throw  new BadRequestException('Make sure that the file is an image');
    }
    return file.originalname;
  }

}
