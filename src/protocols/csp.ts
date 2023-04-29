
export default `
  default-src 'self' gravity:;
  img-src gravity: asset: data: blob: hyper: http: https;
  script-src 'self' gravity: 'unsafe-eval';
  media-src 'self' gravity: hyper:;
  style-src 'self' 'unsafe-inline' gravity:;
  child-src 'self';
`.replace(/\n/g, '')
