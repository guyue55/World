export function getV4PublishingNetworkFeatureStatus() {
  return {
    feature: 'v4-publishing-network',
    label: '发布网络与内容分发',
    status: 'v4-structure-ready',
    releaseReady: false,
    productionLive: false,
  }
}

export * from './types'
