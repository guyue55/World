import audit from '../../data/v2/stage-02/08-v2-audit-evidence-foundation.json'
import auth from '../../data/v2/stage-02/06-v2-auth-session-boundary.json'
import dataModel from '../../data/v2/stage-02/05-v2-data-model-db-boundary.json'
import rbac from '../../data/v2/stage-02/07-v2-rbac-policy.json'

export function getV2SecurityFoundation() {
  return {
    dataModel,
    auth,
    rbac,
    audit,
    summary: {
      stage: 2,
      entities: dataModel.entities.length,
      roles: rbac.roles.length,
      permissions: rbac.permissions.length,
      auditEvents: audit.events.length,
      ready: false,
    },
  }
}
