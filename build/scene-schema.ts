import { z } from 'zod';
import { BuildError } from './build-error';
import { sceneIds } from '../content/scenes/asset-manifest';

const still = z.union([z.enum(['inline:timeline','inline:expertise']),z.string().regex(/^\/art\/[\w-]+\.(?:webp|avif|jpe?g|png|svg)$/)]);
export const sceneSchema = z.object({
  id:z.enum(sceneIds), order:z.number().int().nonnegative(), section:z.string().min(1),
  goal:z.string().min(1), treatment:z.string().min(1), cue:z.string().min(1),
  start:z.string().min(1), end:z.string().min(1), layers:z.array(z.string()).min(1),
  desktop:still, mobile:still, width:z.number().positive(), height:z.number().positive(),
  rights:z.string().min(1), fallback:z.string().min(1), priority:z.enum(['high','near','lazy']),
  isApproved:z.boolean(),
});
export type Scene = z.infer<typeof sceneSchema>;

export function validateScenes(input: unknown, isRelease: boolean): readonly Scene[] {
  const scenes = z.array(sceneSchema).length(sceneIds.length).parse(input);
  const orderIsValid = sceneIds.every((id,index) => scenes[index]?.id === id && scenes[index]?.order === index);
  if (!orderIsValid || (isRelease && scenes.some((scene) => !scene.isApproved))) {
    throw new BuildError('The ordered scene manifest must contain approved stills and fallback content.');
  }
  return scenes;
}
