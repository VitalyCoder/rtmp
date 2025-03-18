import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamService {
  // constructor(private prisma: PrismaService) {}

  async createStream(data: {
    streamKey: string;
    clientId: string;
    startedAt: Date;
  }) {
    console.log(data);

    // return this.prisma.stream.create({
    //   data: {
    //     streamKey: data.streamKey,
    //     clientId: data.clientId,
    //     startedAt: data.startedAt,
    //   },
    // });
  }

  async removeStream(streamKey: string) {
    // return this.prisma.stream.deleteMany({
    //   where: { streamKey },
    // });
    console.log(streamKey);
  }
}
