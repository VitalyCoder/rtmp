import { Module } from '@nestjs/common';
import { StreamService } from 'src/stream/stream.service';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, StreamService],
})
export class WebhookModule {}
