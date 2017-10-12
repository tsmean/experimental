import { Module } from '@nestjs/common';
import {MongoModule} from '../mongo-module/mongo.module';
import {DbAdapter} from './dbadapter';

@Module({
  components: [
    DbAdapter
  ],
  exports: [
    DbAdapter
  ],
  modules: [
    MongoModule
  ]
})
export class DbadapterModule {}
