export function isGatewayReturnArrival(input: { hydrated: boolean; hasReturningJourney: boolean }) {
  return input.hydrated && input.hasReturningJourney
}
