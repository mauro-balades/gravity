
export default `
  default-src 'self' beaker:;
  img-src beaker: asset: data: blob: hyper: http: https;
  script-src 'self' beaker: 'unsafe-eval';
  media-src 'self' beaker: hyper:;
  style-src 'self' 'unsafe-inline' beaker:;
  child-src 'self';
`.replace(/\n/g, '')
