import type Lenis from "lenis";

let _lenis: Lenis | null = null;

export function registerLenis(instance: Lenis): void {
  _lenis = instance;
}

export function getLenis(): Lenis | null {
  return _lenis;
}
