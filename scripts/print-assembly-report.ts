import {
  getAssemblyManifest,
  getEnvironmentBaseline,
  getRepositoryStructureContract,
  getReproducibilityContract,
} from '../src/lib/assembly'

function main() {
  const assembly = getAssemblyManifest()
  const env = getEnvironmentBaseline()
  const repo = getRepositoryStructureContract()
  const repro = getReproducibilityContract()

  console.log(`${assembly.name}`)
  console.log(assembly.principle)
  console.log(`mergeOrder=${assembly.mergeOrder.length}`)
  console.log(`requiredRoots=${assembly.requiredRoots.join(', ')}`)
  console.log(`requiredScripts=${env.requiredScripts.join(', ')}`)
  console.log(`repoRoots=${repo.roots.map((root) => root.path).join(', ')}`)
  console.log(repro.passStatement)
}

main()
