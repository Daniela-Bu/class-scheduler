import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from '../mongodb/schemas/class.schema';
import { ClassTime, ClassTimeSchema } from '../mongodb/schemas';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../authorization/roles.guard';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
    { name: Class.name, schema: ClassSchema },
    { name: ClassTime.name, schema: ClassTimeSchema },
  ])],
  controllers: [SchedulerController],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
