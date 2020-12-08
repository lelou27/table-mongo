import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chambre, ChambreSchema } from './schemas/chambre.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.6hyks.mongodb.net/table-mongo',
    ),
    MongooseModule.forFeature([{ name: Chambre.name, schema: ChambreSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
