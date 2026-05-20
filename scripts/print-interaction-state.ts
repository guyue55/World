import navigationStateContract from '../data/navigation-state-contract.json'
import interactionComponentContract from '../data/interaction-component-contract.json'

function main() {
  console.log(`${navigationStateContract.name}`)
  console.log(`navItems=${navigationStateContract.items.length}`)
  console.log(`desktopItems=${navigationStateContract.items.filter((item) => item.desktop).length}`)
  console.log(`mobileItems=${navigationStateContract.items.filter((item) => item.mobile).length}`)
  console.log(`interactionComponents=${interactionComponentContract.components.length}`)
}

main()
