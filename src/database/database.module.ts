import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { mysqlDatabaseProviders } from './mysql-database.providers';

@Module({
  imports: [],
  providers: [...mysqlDatabaseProviders],
  exports: [...mysqlDatabaseProviders],
})
export class DatabaseModule {}
