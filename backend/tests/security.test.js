import test from 'node:test';
import assert from 'node:assert/strict';

import sanitize from '../src/middleware/sanitize.js';

test('sanitize strips dangerous keys and payload values', () => {
  const req = {
    body: {
      name: '  Alice  ',
      note: '<script>alert(1)</script>',
      __proto__: { hacked: true },
      nested: { value: '  safe  ' },
    },
    query: { search: '  test  ' },
    params: {},
  };

  sanitize(req, {}, () => {});

  assert.equal(req.body.name, 'Alice');
  assert.equal(req.body.note, 'scriptalert(1)/script');
  assert.equal(req.body.nested.value, 'safe');
  assert.equal(Object.prototype.hasOwnProperty.call(req.body, '__proto__'), false);
  assert.equal(req.query.search, 'test');
});
