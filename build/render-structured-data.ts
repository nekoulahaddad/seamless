import type { PageRecord } from './page-schema';
import type { Service } from './service-schema';
import type { SiteProfile } from './site-profile-schema';
import { socialCard } from '../content/seo';

export function renderStructuredData(page:PageRecord,profile:SiteProfile,services:readonly Service[]):string {
  const home = new URL('/',profile.origin).href;
  const organizationId = home+'#organization';
  const websiteId = home+'#website';
  const canonical = new URL(page.path,home).href;
  const organization = {
    '@type':'Organization','@id':organizationId,name:profile.name,url:home,
    logo:new URL(profile.logo,home).href,description:profile.positioning,
    contactPoint:{'@type':'ContactPoint',contactType:'business enquiries',url:home+'#contact',availableLanguage:profile.locale},
  };
  const website = {'@type':'WebSite','@id':websiteId,url:home,name:profile.name,publisher:{'@id':organizationId},inLanguage:profile.locale};
  const webpage = {
    '@type':'WebPage','@id':canonical+'#webpage',url:canonical,name:page.title,
    description:page.description,isPartOf:{'@id':websiteId},about:{'@id':organizationId},
    inLanguage:page.locale,primaryImageOfPage:{'@type':'ImageObject',url:new URL(page.socialImage,home).href,
      width:socialCard.width,height:socialCard.height},
  };
  const graph=page.id==='home'
    ? [organization,website,webpage,...services.map((service)=>describeService(service,home,organizationId))]
    : [webpage];
  const json=JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function describeService({id,name,summary}:Service,home:string,provider:string):object {
  const url=home+'#service-'+id;
  return {'@type':'Service','@id':url,url,name,description:summary,provider:{'@id':provider}};
}
