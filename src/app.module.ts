import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertyModule } from './property/property.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ReportModule } from './report/report.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { CacheInterceptor, CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,

    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      ssl: {
        rejectUnauthorized: false // This is generally not recommended for production unless you fully trust the network and the database.
      },
      logger: 'advanced-console',
      logging: 'all',
      
      
      
    }),
    CacheModule.register({
      store: redisStore,
      ttl: 60 * 1000 * 60, // Los elementos en caché se borran después de 30 segundos
      isGlobal: true, 
      password: 'fzxNSdA2GEKX1nhB21ibg0VIzhIkG7h78AzCaG5PaZk=',
      socket: {
        host: 'saynest.redis.cache.windows.net',
        port: 6380,
        password: 'fzxNSdA2GEKX1nhB21ibg0VIzhIkG7h78AzCaG5PaZk=',
        tls: true
      }
    }),

    PropertyModule,
    BookingModule,
    UserModule,
    AuthModule,
    ReportModule,
    CommonModule,SeedModule
    ],
  controllers: [AppController],
  providers: [AppService, 
    AuthGuard,{
      provide: 'APP_INTERCEPTOR', // Aqui estamos definiendo que el interceptor de cache
      useClass: CacheInterceptor, // se aplique a todas las rutas de nuestra aplicación OJO solo metodo GET
      // La key de los datos en caché se generará a partir de la URL de la solicitud.
    }],
  exports: [TypeOrmModule]
})


export class AppModule  {
  
}
