import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { HateoasRequest } from './interfaces/hateoas-request.interface';
import { HateoasLink } from './interfaces/hateoas-link.interface';
import { Participant } from 'src/participant/domain/entities/participant.entity';

export class HateoasInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<HateoasRequest>();
    const { host, method } = request;
    const _links: HateoasLink[] = [];

    if (method === 'DELETE') return next.handle();

    const baseUrl = `http://${host}/participant`;

    return next.handle().pipe(
      map((data: Participant) => {
        const hasId = data.id;
        if (data.id) {
          _links.push(
            {
              rel: 'self',
              href: `${baseUrl}/${hasId}`,
              method: method,
            },
            {
              rel: 'get',
              href: `${baseUrl}/${hasId}`,
              method: 'GET',
            },
            {
              rel: 'update',
              href: `${baseUrl}/${hasId}`,
              method: 'PATCH',
            },
            {
              rel: 'delete',
              href: `${baseUrl}/${hasId}`,
              method: 'DELETE',
            },
          );
        } else {
          _links.push(
            { rel: 'list', href: `${baseUrl}`, method: 'GET' },
            {
              rel: 'create',
              href: `${baseUrl}`,
              method: 'POST',
            },
          );
        }
        return { data, _links };
      }),
    );
  }
}
