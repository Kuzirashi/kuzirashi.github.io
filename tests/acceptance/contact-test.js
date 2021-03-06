import { test } from 'qunit';
import moduleForAcceptance from 'kuzi/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | contact');

test('visiting /contact', function(assert) {
  assert.expect(3);

  visit('/contact');

  andThen(function() {
    assert.equal(currentURL(), '/contact');
    assert.equal($('div.main').text(), 'HIRE@DANIELKMAK.COM');
    assert.equal($('.bw-box footer').text(), 'HIRE ME');
  });
});
