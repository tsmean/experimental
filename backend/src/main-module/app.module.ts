import { Module } from '@nestjs/common';
import {RouterModule} from '../router-module/router.module';
import {AuthModule} from '../auth-module/auth.module';
import {MongoModule} from '../mongo-module/mongo.module';
import {DbadapterModule} from '../dbadapter-module/dbadapter.module';

@Module({
  modules: [
    RouterModule,
    AuthModule,
    MongoModule,
    DbadapterModule
  ]
})
export class AppModule {}
