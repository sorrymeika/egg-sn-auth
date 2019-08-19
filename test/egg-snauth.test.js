'use strict';

const mock = require('egg-mock');

describe('test/egg-snauth.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-snauth-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, snauth')
      .expect(200);
  });
});
