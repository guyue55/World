import { getV2SecurityFoundation } from '../src/lib/v2/security'

const foundation = getV2SecurityFoundation()
console.log('V2 Stage 02 Security Foundation')
console.log(`entities=${foundation.summary.entities}`)
console.log(`roles=${foundation.summary.roles}`)
console.log(`permissions=${foundation.summary.permissions}`)
console.log(`auditEvents=${foundation.summary.auditEvents}`)
console.log(`ready=${foundation.summary.ready}`)
