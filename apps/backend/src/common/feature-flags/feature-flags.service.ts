import { Injectable } from '@nestjs/common';

export type FeatureFlag =
  | 'TELEGRAM_NOTIFICATIONS'
  | 'AUTO_SCHOOL_IMPORT'
  | 'FINANCE_MODULE'
  | 'DASHBOARD_FORECASTING';

const DEFAULT_FLAGS: Record<FeatureFlag, boolean> = {
  TELEGRAM_NOTIFICATIONS: true,
  AUTO_SCHOOL_IMPORT: true,
  FINANCE_MODULE: true,
  DASHBOARD_FORECASTING: false,
};

@Injectable()
export class FeatureFlagsService {
  private flags: Record<FeatureFlag, boolean>;

  constructor() {
    this.flags = { ...DEFAULT_FLAGS };
    for (const key of Object.keys(DEFAULT_FLAGS) as FeatureFlag[]) {
      const envVal = process.env[`FEATURE_${key}`];
      if (envVal !== undefined) this.flags[key] = envVal === 'true';
    }
  }

  isEnabled(flag: FeatureFlag): boolean {
    return this.flags[flag];
  }

  getAll(): Record<FeatureFlag, boolean> {
    return { ...this.flags };
  }
}
