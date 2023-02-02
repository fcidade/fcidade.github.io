import { error } from "@sveltejs/kit";
import type { Sketch } from "p5-svelte";
import { sketches } from "../../../sketches/p5";

export type LoadRequest = { params: { slug: string } };

export const load = ({ params }: LoadRequest): LoadResponse => {
  const sketch = sketches[params.slug];
  if (!sketch) throw error(404);
  return { sketch };
};

export type LoadResponse = { sketch: Sketch };
