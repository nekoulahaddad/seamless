import type { SiteProfile } from '../../../build/site-profile-schema';
import type { Service } from '../../../build/service-schema';
import type { Market, NetworkLocation } from '../../../build/geography-schema';
import type { Credibility } from '../../../build/credibility-schema';
import { renderNavigation } from '../../features/navigation/render-navigation';
import { renderHero } from '../../features/hero/render-hero';
import { renderIntroduction } from '../../features/hero/render-introduction';
import { renderConnections } from '../../features/markets/render-market-map';
import { renderMarkets } from '../../features/markets/render-market-profiles';
import { renderExpertise } from '../../features/expertise/render-expertise';
import { renderApproach } from '../../features/approach/render-approach';
import { renderFinale } from '../../features/approach/render-finale';
import { renderDifferentiators } from '../../features/credibility/render-differentiators';
import { renderNetwork } from '../../features/credibility/render-network';
import { renderEvidence } from '../../features/credibility/render-evidence';
import { renderContact } from '../../features/contact/render-contact';
import { renderFooter } from '../../shared/render/render-footer';

export interface HomeProps {
  profile: SiteProfile; services: readonly Service[]; markets: readonly Market[];
  locations: readonly NetworkLocation[]; credibility: readonly Credibility[];
  encodedContact: string; disclosure: string; isRelease: boolean;
}
export function renderHome(props: HomeProps): string {
  const { profile, services, markets, locations, credibility } = props;
  const isCasePublished = credibility.some((item)=>item.kind==='case');
  const banner = props.isRelease ? '' : '<p class="preview-banner">Preview • concept visuals and demonstration contact</p>';
  const motion = '<div class="motion-toolbar"><button type="button" class="cta" data-motion-toggle hidden>Pause Motion</button></div>';
  return `${banner}${renderNavigation(profile,isCasePublished)}<main id="main">
    ${renderHero()}${motion}${renderConnections(markets,locations)}${renderIntroduction(profile)}
    ${renderExpertise(services)}${renderApproach()}${renderMarkets(markets,locations,services)}
    ${renderDifferentiators()}${renderNetwork(credibility)}${renderEvidence(credibility)}
    ${renderFinale()}${renderContact(props.encodedContact,props.isRelease)}</main>
    ${props.disclosure}${renderFooter(profile)}`;
}
