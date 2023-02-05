import type { Sketch } from "p5-svelte"
import { fractalTree } from "./fractal-tree"
import { purpleRain } from "./purple-rain"

export const sketches: Record<string, Sketch> = {
    'purple-rain': purpleRain,
    'fractal-tree': fractalTree,
}
