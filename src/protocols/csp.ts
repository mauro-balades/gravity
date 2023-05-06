
export default `
  default-src * gravity:;
  img-src gravity: asset: data: blob: http: https;
  script-src 'self' gravity: 'unsafe-eval';
  media-src 'self' gravity:;
  style-src * gravity: data: blob: 'unsafe-inline';
  font-src * gravity: data: blob: 'unsafe-inline';
`.replace(/\n/g, '')
