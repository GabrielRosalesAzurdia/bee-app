import type { Bee } from "../entities/bee";

export function getBees() {
  return useFetch<Bee[]>(`/api/bees`);
}
