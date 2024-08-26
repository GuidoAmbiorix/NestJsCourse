import { Injectable } from '@nestjs/common';
import {ProductsService} from "../products/products.service";
import {initialData} from "./data/seed-data";

@Injectable()
export class SeedService {
  
  constructor(private readonly productsService: ProductsService) {
  }
  async runSeed() {
    await this.insertNewProducts(); 
    return `This action returns all seed`;
  }
  private async insertNewProducts(){
    await this.productsService.deleteAllProducts();
    
    const products = initialData.products;
    
    const insertPromises = [];
    products.forEach(proudct =>{
      insertPromises.push(this.productsService.create(proudct));
    });
    
    const results = await Promise.all(insertPromises);
    
    return true;
  }

}
