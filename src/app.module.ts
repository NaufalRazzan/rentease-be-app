import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MainModule } from './modules/mainModule.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URI,
        autoLoadEntities: true,
        synchronize: true,
        retryAttempts: 2
      })
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY_AUTH,
      signOptions: { expiresIn: '5m' }
    }),
    MainModule,
    AuthModule
  ],
  providers: [Logger],
})
export class AppModule {}
