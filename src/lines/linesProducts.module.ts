import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataBaseModule } from 'src/database/database.module';
import { LinesController } from './linesProducts.controller';
import { LinesService } from './linesProducts.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: `${process.env.JWT_EXPIRES_IN}s`,
        },
      }),
    }),
    DataBaseModule,
  ],
  controllers: [LinesController],
  providers: [LinesService],
})
export class LinesModule {}
