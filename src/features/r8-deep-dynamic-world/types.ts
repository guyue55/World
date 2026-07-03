export type DynamicDepthStage = {
  stage: number
  title: string
  focus: string
  batches: string[]
  status: 'complete' | 'blocked'
}

export type DynamicPageMatrixItem = {
  path: string
  dynamicLayer: string
  status: 'deepened' | 'pending'
}
