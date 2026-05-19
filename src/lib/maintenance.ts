import maintenanceCalendar from '../../data/maintenance-calendar.json'
import recoveryPlaybook from '../../data/recovery-playbook.json'

export type MaintenanceCadence = {
  id: string
  tasks: string[]
}

export type RecoveryPath = {
  id: string
  when: string
  steps: string[]
}

export function getMaintenanceCalendar() {
  return maintenanceCalendar
}

export function getMaintenanceCadences(): MaintenanceCadence[] {
  return maintenanceCalendar.cadence as MaintenanceCadence[]
}

export function getRecoveryPlaybook() {
  return recoveryPlaybook
}

export function getRecoveryPaths(): RecoveryPath[] {
  return recoveryPlaybook.recoveryPaths as RecoveryPath[]
}
