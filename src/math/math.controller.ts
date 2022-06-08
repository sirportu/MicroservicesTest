import { Controller } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class MathController {
  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  /* PATRON SOLICITUD-RESPUESTA */

  @MessagePattern({ cmd: 'sum' })
  async accumulateAsync(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern({ cmd: 'sum' })
  accumulateObservable(data: number[]): Observable<number> {
    return from([1, 2, 3]);
  }

  /**/

  /* PATRON BASADO EN EVENTOS */

  @EventPattern('user_created')
  async handleUserCreated(data: Record<string, unknown>) {
    // business logic
  }

  /**/

  /* INFORMACIÓN ADICIONAL SOBRE SOLICITUD ENTRANTE (NATS, KAFKA) */

  @MessagePattern('time.us.*')
  getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
    console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
    return new Date().toLocaleTimeString();
  }

  /**/
}
