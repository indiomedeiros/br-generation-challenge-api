import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HateoasRequest } from './interfaces/hateoas-request.interface';
import { HateoasLink } from './interfaces/hateoas-link.interface';
import { Participant } from 'src/participant/domain/entities/participant.entity';

export class HateoasInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<HateoasRequest>();

    const baseUrl: string = request.host;
    const hasID: string | undefined = request.params.id;
    const method: string = request.method;
    const _links: HateoasLink[] = [];

    if (method === 'DELETE') return next.handle();

    if (hasID) {
      _links.push(
        {
          rel: 'self',
          href: `http://${baseUrl}/participant/${hasID}`,
          method: 'GET',
        },
        {
          rel: 'update',
          href: `http://${baseUrl}/participant/${hasID}`,
          method: 'PATCH',
        },
        {
          rel: 'delete',
          href: `http://${baseUrl}/participant/${hasID}`,
          method: 'DELETE',
        },
      );
    } else {
      _links.push(
        { rel: 'list', href: `http://${baseUrl}/participant`, method: 'GET' },
        {
          rel: 'create',
          href: `http://${baseUrl}/participant`,
          method: 'POST',
        },
      );
    }

    return next.handle().pipe(map((data: Participant) => ({ data, _links })));
  }
}
