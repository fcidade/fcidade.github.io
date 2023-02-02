import type { Sketch } from "p5-svelte"
import { purpleRain } from "./purple-rain"

export const sketches: Record<string, Sketch> = {
    'purple-rain': purpleRain,
}
