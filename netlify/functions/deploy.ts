import type { Config } from '@netlify/functions';

const BUILD_HOOK =
  'https://api.netlify.com/build_hooks/69073d58d178daa37cd97bc9'; 

export default async (req: Request) => {
  await fetch(BUILD_HOOK, {
    method: 'POST',
  })
};

export const config: Config = {
  schedule: '0 12 * * *',
};
