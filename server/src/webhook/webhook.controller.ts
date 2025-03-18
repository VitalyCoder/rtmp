import { Body, Controller, Post } from '@nestjs/common';
import { StreamService } from 'src/stream/stream.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly streamService: StreamService) {}

  @Post('stream')
  async handleStreamWebhook(@Body() data: any) {
    console.log('Stream Webhook Data:', data);

    if (data.event === 'stream_publish') {
      await this.streamService.createStream({
        streamKey: data.stream,
        clientId: data.clientId,
        startedAt: new Date(),
      });
    } else if (data.event === 'stream_unpublish') {
      await this.streamService.removeStream(data.stream);
    }
  }
}
