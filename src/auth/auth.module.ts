import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/common/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
      JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config:ConfigService) => ({
          secret: config.get('app_key'),
          signOptions: {
            expiresIn: 3600, // 1 hour
          },
        }),
      })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
