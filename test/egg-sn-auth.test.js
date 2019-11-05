'use strict';

const mock = require('egg-mock');

describe('test/egg-sn-auth.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-sn-auth-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, sn-auth')
      .expect(200);
  });
});
