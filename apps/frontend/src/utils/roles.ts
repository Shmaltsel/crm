export function hasRole(userRole: string | undefined, allowedRoles?: string[]): boolean {
  return !allowedRoles || (!!userRole && allowedRoles.includes(userRole));
}
