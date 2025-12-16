import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateurs } from './entities/utilisateurs';
import { Messages } from './entities/messages';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    UsersModule,
    MoteurModule,
    GenerateurModule,
    PhareModule,
    AudioModule,
    VehiculeModule,
    MessagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/atelier-db',
      synchronize: true,
      logging: true,
      entities: [Utilisateurs, Messages],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
