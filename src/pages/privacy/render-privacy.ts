import { renderLegal } from '../../shared/render/render-legal';
import type { SiteProfile } from '../../../build/site-profile-schema';

export function renderPrivacy(profile: SiteProfile, disclosure: string): string {
  return renderLegal('Privacy Policy', profile.privacy, profile, disclosure);
}
