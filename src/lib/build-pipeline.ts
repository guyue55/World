import pipeline from '../../data/build-pipeline.json'

export type BuildPipelineStage = {
  id: string
  command: string
  blocksBuild: boolean
}

export type BuildPipeline = {
  version: string
  stages: BuildPipelineStage[]
  principle: string
}

export function getBuildPipeline(): BuildPipeline {
  return pipeline as BuildPipeline
}

export function getBlockingBuildStages(): BuildPipelineStage[] {
  return getBuildPipeline().stages.filter((stage) => stage.blocksBuild)
}
