import { SetMetadata } from '@nestjs/common';

export interface IPolicy {}

export const POLICY_KEY = 'policy_KEY';
export const Policy = (policy: IPolicy,action?:string) => SetMetadata(POLICY_KEY, {policy,action});
