import blueprint from '../../data/v3-concept/01-product-experience-blueprint.json'

export function getV3ProductExperienceBlueprint() {
  return {
    blueprint,
    summary: {
      firstScreenItems: blueprint.firstScreen.length,
      experienceDiffs: blueprint.v2ToV3ExperienceDiff.length,
      aiLighthouseItems: blueprint.aiLighthouseExperience.length,
      privatePresenceItems: blueprint.privateArchivePresence.length,
      acceptanceSignals: blueprint.acceptanceSignals.length,
      ready: blueprint.ready,
    },
  }
}
