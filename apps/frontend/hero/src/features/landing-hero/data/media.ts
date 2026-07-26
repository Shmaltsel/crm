const BLOB_BASE = 'https://n1gzcjyiqdwr3azb.public.blob.vercel-storage.com'

export const MEDIA_URLS = {
  heroPreview: `${BLOB_BASE}/hero/hologram-event.mp4`,
  malyuvaika: `${BLOB_BASE}/hero/malyuvaika-video.mp4`,
  hologramEvent: `${BLOB_BASE}/hero/hologram-event.mp4`,
  hologramReaction: `${BLOB_BASE}/hero/hologram-reaction.mp4`,
  popify: `${BLOB_BASE}/hero/popify-video.mp4`,
} as const
