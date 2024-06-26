import { useCallback, useRef } from 'react';
import { Policy, PolicyManager } from './../Utils/policyManager.utils';
import { ObjectDto } from '../backend/Dtos';

export const usePolicyManager = (policy: Policy[], data: ObjectDto) => {
    const policyManagerRef = useRef<PolicyManager>(new PolicyManager());
    const policyManager = policyManagerRef.current;

    const isNodeVisible = useCallback(
        (node: string): boolean => {
            policyManager.setPolicy(policy || []);
            policyManager.setData(data || {});
            return policyManager?.isNodeVisible(node);
        },
        [policyManager, policy, data]
    );
    const isNodeDisable = useCallback(
        (node: string): boolean => {
            policyManager.setPolicy(policy || []);
            policyManager.setData(data || {});
            return policyManager?.isNodeDisable(node);
        },
        [policyManager, policy, data]
    );

    return { policy: policyManager, isNodeVisible, isNodeDisable };
};
