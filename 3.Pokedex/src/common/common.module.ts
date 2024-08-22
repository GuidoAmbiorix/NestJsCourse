import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axio.adapter';

@Module({
  providers: [AxiosAdapter],
  exports: [AxiosAdapter],
})
export class CommonModule {}
