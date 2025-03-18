import { Controller, Get } from '@nestjs/common';
import axios from 'axios';

@Controller('stream')
export class StreamController {
  private readonly MEDIA_MTX_API = 'http://mediamtx:8888/v1/streams/list';

  @Get()
  async getStreams() {
    try {
      const response = await axios.get(this.MEDIA_MTX_API);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch streams');
    }
  }
}
