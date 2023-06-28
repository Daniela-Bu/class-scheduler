import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './features/mongodb/mongodb.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { SchedulerModule } from './features/scheduler/scheduler.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://danielab:bambook3@cluster0.fsz2sdy.mongodb.net/class-scheduler'),
    MongodbModule,
    UserModule,
    SchedulerModule,
    AuthModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
