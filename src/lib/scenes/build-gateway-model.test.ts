import assert from 'node:assert/strict'
import test from 'node:test'
import { isGatewayReturnArrival } from './build-gateway-model'

test('同一会话从世界场景返回 Gateway 不重播关门仪式', () => {
  assert.equal(isGatewayReturnArrival({ hydrated: false, hasReturningJourney: true }), false)
  assert.equal(isGatewayReturnArrival({ hydrated: true, hasReturningJourney: false }), false)
  assert.equal(isGatewayReturnArrival({ hydrated: true, hasReturningJourney: true }), true)
})
