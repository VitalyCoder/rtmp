import { Controller, Post, Request } from '@nestjs/common';
import { StreamService } from 'src/stream/stream.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly streamService: StreamService) {}

  @Post('stream')
  async handleStreamWebhook(@Request() req: any) {
    console.log('Stream Webhook Data:', req.body);

    // if (data.event === 'stream_publish') {
    //   await this.streamService.createStream({
    //     streamKey: data.stream,
    //     clientId: data.clientId,
    //     startedAt: new Date(),
    //   });
    // } else if (data.event === 'stream_unpublish') {
    //   await this.streamService.removeStream(data.stream);
    // }
  }
}
