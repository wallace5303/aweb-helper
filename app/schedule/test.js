'use strict';

const Subscription = require('egg').Subscription;

/**
 * test
 */

class Test extends Subscription {
  static get schedule() {
    return {
      interval: '360m',
      type: 'worker',
      immediate: false,
      disable: true,
    };
  }

  async subscribe() {
    const { ctx, app, service } = this;

    // service.docker.networkClean();
  }
}

module.exports = Test;
