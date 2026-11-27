import { renderLegal } from '../../shared/render/render-legal';
import type { SiteProfile } from '../../../build/site-profile-schema';

export function renderTerms(profile: SiteProfile, disclosure: string): string {
  return renderLegal('Terms of Use', profile.terms, profile, disclosure);
}
