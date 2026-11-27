import { en } from './locales/en';
import type { SiteProfile } from '../build/site-profile-schema';

export const fixtureProfile = {
  name: 'Seamless Market Entry Advisory',
  mission: 'We help international pharmaceutical manufacturers select markets, navigate regulatory pathways, and find regional business partners.',
  positioning: en.support,
  logo: '/scenes/mark.svg',
  origin: 'https://seamless.example',
  locale: 'en',
  navigation: [...en.nav],
  privacy: 'This local preview does not send or store messages. Email controls open your own email app or reveal a demonstration address. No contact tracking is enabled. Production privacy text is pending company approval.',
  terms: 'This is a local demonstration of the website. It is not an offer of services, a statement of regulatory approval, or a representation of an actual facility. Production terms are pending company approval.',
  contactRef: 'official-alias',
  isPublicationApproved: false,
} satisfies SiteProfile;
