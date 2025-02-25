import { z } from 'zod';

const baseUrl = 'https://api.abelab.dev/daas';

export type APIParams = {
  '/judge/': {
    dajare: string;
  };
  '/eval/': {
    dajare: string;
  };
};

const APIResponseSchemes = {
  '/judge/': z.object({
    status: z.union([z.literal('OK'), z.literal('error')]),
    message: z.string(),
    is_dajare: z.boolean(),
  }),
  '/eval/': z.object({
    status: z.union([z.literal('OK'), z.literal('error')]),
    message: z.string(),
    score: z.number(),
  }),
};

export type APIResponses = {
  [K in keyof typeof APIResponseSchemes]: z.infer<typeof APIResponseSchemes[K]>;
};

export const fetchDajareAPI = async <
  Path extends keyof APIParams | keyof APIResponses
>(
  path: Path,
  params: APIParams[Path]
): Promise<APIResponses[Path]> => {
  const paramString = new URLSearchParams(params).toString();

  const result = await fetch(`${baseUrl}${path}?${paramString}`);

  const resultJSON = await result.json();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const response: APIResponses[Path] =
    APIResponseSchemes[path].parse(resultJSON);

  if (response.status !== 'OK') {
    throw new Error(resultJSON.message);
  }

  return response;
};
