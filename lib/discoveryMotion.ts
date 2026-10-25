/**
 * Spring clock adapted from Hairline by Lucas Marques (MIT), commit
 * 37d2e78dcb333ab30c3338e28ed4a690364ea014, core/motion.ts.
 * Full notice: public/licenses/hairline-MIT.txt.
 * Changes: instance-local reduced motion and bounded frame steps; no global clock.
 */
export type DiscoverySpring = { position: number; velocity: number; target: number };
export function discoverySpring(position = 0): DiscoverySpring {
  return { position, velocity: 0, target: position };
}

export function stepDiscoverySpring(spring: DiscoverySpring, seconds: number, reduced = false): boolean {
  if (reduced) {
    spring.position = spring.target;
    spring.velocity = 0;
    return false;
  }
  // A sleeping/background tab must not create unbounded simulation work.
  const dt = Number.isFinite(seconds) ? Math.min(Math.max(seconds, 0), 1 / 30) : 0;
  const steps = Math.max(1, Math.ceil(dt * 240));
  const step = dt / steps;
  for (let index = 0; index < steps; index += 1) {
    const acceleration = -100 * (spring.position - spring.target) - 18 * spring.velocity;
    spring.velocity += acceleration * step;
    spring.position += spring.velocity * step;
  }
  if (Math.abs(spring.position - spring.target) < 0.01 && Math.abs(spring.velocity) < 0.1) {
    spring.position = spring.target;
    spring.velocity = 0;
    return false;
  }
  return true;
}
