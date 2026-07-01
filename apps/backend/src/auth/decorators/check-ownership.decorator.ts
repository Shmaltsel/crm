import { SetMetadata } from '@nestjs/common';

export type OwnedResourceType = 'school' | 'event' | 'city' | 'crew';

export const OWNERSHIP_KEY = 'ownershipResourceType';
export const CheckOwnership = (resourceType: OwnedResourceType) =>
  SetMetadata(OWNERSHIP_KEY, resourceType);
