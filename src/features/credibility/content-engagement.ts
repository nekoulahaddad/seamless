type EngagementEvent = Readonly<{
  event: 'service-view' | 'market-view' | 'case-study-view' | 'story-complete';
  contentId: string;
}>;

export function engagementSink(isApproved: boolean, send: (event: EngagementEvent) => void):
  ((event: EngagementEvent) => void) | undefined {
  if (!isApproved) return undefined;
  return (event) => {
    if (/^[a-z][a-z0-9-]{0,47}$/.test(event.contentId)) send(event);
  };
}
