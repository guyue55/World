import {
  getInteractionQaChecklist,
  getLayoutResponsiveContract,
  getVisualInteractionDefectRegister,
  getVisualQaChecklist,
} from '../src/lib/visual-interaction-qa'

function main() {
  const visual = getVisualQaChecklist()
  const interaction = getInteractionQaChecklist()
  const layout = getLayoutResponsiveContract()
  const defects = getVisualInteractionDefectRegister()

  console.log(`${visual.name}`)
  console.log(`viewports=${visual.viewports.length}`)
  console.log(`routes=${visual.routes.length}`)
  console.log(`interactions=${interaction.interactions.length}`)
  console.log(`layoutZones=${layout.layoutZones.length}`)
  console.log(`defects=${defects.defects.length}`)
}

main()
