import {
  getComponentContract,
  getCouplingGuard,
  getDependencyDirectionContract,
  getExtensionInterfaceContract,
  getModuleArchitectureContract,
} from '../src/lib/architecture-contracts'

function main() {
  const modules = getModuleArchitectureContract()
  const deps = getDependencyDirectionContract()
  const components = getComponentContract()
  const extensions = getExtensionInterfaceContract()
  const guard = getCouplingGuard()

  console.log(`${modules.name}`)
  console.log(`layers=${modules.layers.length}`)
  modules.layers.forEach((layer) => console.log(`- ${layer.id}: ${layer.path}`))
  console.log(`forbiddenImports=${deps.forbiddenImports.length}`)
  console.log(`componentKinds=${components.componentKinds.length}`)
  console.log(`extensionInterfaces=${extensions.interfaces.length}`)
  console.log(`antiPatterns=${guard.antiPatterns.length}`)
}

main()
