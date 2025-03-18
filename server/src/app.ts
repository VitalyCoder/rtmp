import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { ExceptionFilter } from './filters';
import { ClientExceptionsInterceptor } from './interceptors';

export class App {
  private readonly app: INestApplication;
  private readonly apiPort: number;
  private readonly apiVersion: string;
  private readonly apiPrefix: string;
  private readonly swaggerTitle: string;
  private readonly swaggerDescription: string;
  private readonly swaggerPath: string;
  private readonly configService: ConfigService;

  constructor(app: INestApplication) {
    this.app = app;
    this.configService = app.get(ConfigService);
    this.apiPort = this.configService.getOrThrow<number>('API_PORT');
    this.apiVersion = this.configService.getOrThrow<string>('API_VERSION');
    this.apiPrefix = this.configService.getOrThrow<string>('API_PREFIX');
    this.swaggerTitle = this.configService.getOrThrow<string>('SWAGGER_TITLE');
    this.swaggerDescription = this.configService.getOrThrow<string>(
      'SWAGGER_DESCRIPTION',
    );

    this.swaggerPath = this.configService.getOrThrow<string>('SWAGGER_PATH');
  }

  private async appConfig() {
    this.app.setGlobalPrefix(this.apiPrefix);
    this.app.enableVersioning({
      defaultVersion: this.apiVersion,
      type: VersioningType.URI,
    });
    this.app.enableCors({
      credentials: true,
      origin:
        this.configService.getOrThrow<string>('NODE_ENV') === 'development'
          ? '*'
          : this.configService.getOrThrow<string>('ALLOWED_ORIGIN'),
      exposedHeaders: ['set-cookie'],
    });

    return this;
  }

  private validationConfig() {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    return this;
  }

  private assignInterceptors() {
    this.app.useGlobalInterceptors(new ClientExceptionsInterceptor());
    return this;
  }

  private assignFilters() {
    this.app.useGlobalFilters(new ExceptionFilter());
    return this;
  }

  private swaggerConfig() {
    const options = new DocumentBuilder()
      .setTitle(this.swaggerTitle)
      .setDescription(this.swaggerDescription)
      .setVersion(this.apiVersion)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup(
      `${this.apiPrefix}/:version/${this.swaggerPath}`,
      this.app,
      document,
      {
        swaggerOptions: { persistAuthorization: true },
      },
    );
    return this;
  }

  private async runApp() {
    await this.app.listen(this.apiPort);
    console.log(`Application is running on: http://localhost:${this.apiPort}`);
    return this;
  }

  public static async run() {
    const app = await NestFactory.create(AppModule, { cors: false });

    await (await new App(app).appConfig())
      .validationConfig()
      .swaggerConfig()
      .assignFilters()
      .assignInterceptors()
      .runApp();
  }
}
