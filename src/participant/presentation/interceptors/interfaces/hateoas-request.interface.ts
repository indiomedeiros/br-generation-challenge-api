export interface HateoasRequest extends Request {
  host: string;
  params: { id?: string };
}
