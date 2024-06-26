import { ObjectDto } from '../backend/Dtos';
import { GetObjectProperty, IsEmptyArray } from './common.utils';

export interface Policy {
    node: string;
    rules?: PolicyRules;
}

type PolicyRules = Array<PolicyRuleType | PolicyRule>;

interface PolicyRule {
    ruleType?: PolicyRuleType;
    condition?: PolicyRuleCondition;
    conditionNode?: string | string[];
    conditionValue?: any;
}

export enum PolicyRuleType {
    SHOW = 'show',
    HIDE = 'hide',
    ENABLE = 'enable',
    DISABLE = 'disable',
}

export enum PolicyRuleCondition {
    IS_DISABLED = 'is_disabled',
    IS_HIDDEN = 'is_hidden',
    HAS_VALUE = 'has_value',
    HAS_SOME_VALUE = 'has_some_value',
    NOT_HAS_VALUE = 'not_has_value',
    NOT_SOME_HAS_VALUE = 'not_some_has_value',
}

/**
 * A policy manager to manage the policy of data controls, data validations, and UI controls based on data provided.
 */
export class PolicyManager {
    /**
     * The policy.
     */
    public _policy: Policy[] = [];

    /**
     * The data.
     */
    public _data: ObjectDto = {};

    // private constructor() {
    //     this._policy = {};
    // }

    /**
     * Sets the policy.
     *
     * @param policy the policy to set
     */
    public setPolicy(policy: Policy[]) {
        this._policy = policy;
    }

    /**
     * Sets the data.
     * @param data the data to set
     */
    public setData(data: ObjectDto) {
        this._data = data;
    }

    /**
     * Returns the policy.
     *
     * @returns the policy
     */
    public getPolicy(): Policy[] {
        return this._policy;
    }

    /**
     * Checks if a node is visible.
     *
     * @param node the node to check `string`
     * @returns is the node visible
     */
    public isNodeVisible(node: string): boolean {
        const rules = this._getNodeRules(node);
        if (!rules.length) return true;

        const process = this._processRules(node, [
            PolicyRuleType.SHOW,
            PolicyRuleType.HIDE,
        ]);

        return process;
    }

    /**
     * Checks if a node is disable.
     *
     * @param node the node to check `string`
     * @returns is the node disable
     */
    public isNodeDisable(node: string): boolean {
        const rules = this._getNodeRules(node);
        if (!rules.length) return false;

        const process = !this._processRules(node, [
            PolicyRuleType.ENABLE,
            PolicyRuleType.DISABLE,
        ]);

        return process;
    }

    /**
     * Returns all rules for a node.
     *
     * @param node the node to check `string`
     * @returns the rules
     */
    private _getNodeRules(node: string): PolicyRules[] {
        const policies = this._policy.filter((p) => p.node === node);

        return policies.map((p) => {
            if (!p.rules.length) return [];
            return p.rules;
        });
    }

    /**
     * Process the rules for a node.
     *
     * @param node the node to check `string`
     * @param ruleTypes the rule types to check
     * @returns the result
     */
    private _processRules(node: string, ruleTypes?: PolicyRuleType[]) {
        const rulesArray = this._getNodeRules(node);

        let result: boolean;

        for (let rules of rulesArray) {
            for (let rule of rules) {
                if (!IsEmptyArray(ruleTypes)) {
                    if (!IsPolicyRule(rule) && !ruleTypes.includes(rule))
                        continue;
                    if (
                        IsPolicyRule(rule) &&
                        !ruleTypes.includes(rule.ruleType)
                    )
                        continue;
                }

                if (
                    IsPolicyRule(rule) &&
                    rule.ruleType === PolicyRuleType.SHOW
                ) {
                    result = this._checkRuleCondition(rule);
                    if (!result) break;
                }
                if (
                    IsPolicyRule(rule) &&
                    rule.ruleType === PolicyRuleType.HIDE
                ) {
                    result = !this._checkRuleCondition(rule);
                    if (!result) break;
                }

                if (
                    IsPolicyRule(rule) &&
                    rule.ruleType === PolicyRuleType.ENABLE
                ) {
                    result = this._checkRuleCondition(rule);
                    if (!result) break;
                }
                if (
                    IsPolicyRule(rule) &&
                    rule.ruleType === PolicyRuleType.DISABLE
                ) {
                    result = !this._checkRuleCondition(rule);
                    if (!result) break;
                }
            }

            if (result) break;
        }

        if (typeof result === 'undefined') return true;

        return result;
    }

    /**
     * Checks the rule condition.
     *
     * @param rule the rule to check
     * @returns the result
     */
    private _checkRuleCondition = (rule: PolicyRule) => {
        const isCondition = PolicyCondition.processCondition(
            this._data,
            rule.condition,
            rule.conditionNode,
            rule.conditionValue,
            this
        );

        return isCondition;
    };
}

/**
 * Policy Condition Class.
 */
class PolicyCondition {
    /**
     * Process the condition for a node.
     *
     * @param data data to process
     * @param condition the condition to process
     * @param conditionNode the condition nodes
     * @param conditionValue the condition value
     * @returns condition result
     */
    public static processCondition = (
        data: ObjectDto,
        condition: PolicyRuleCondition,
        conditionNode: string | string[],
        conditionValue: any,
        policyManager: PolicyManager,
        isInsideArray?: boolean
    ) => {
        let result = false;

        switch (condition) {
            case PolicyRuleCondition.HAS_VALUE:
            case PolicyRuleCondition.HAS_SOME_VALUE:
                // If condition node is array then process the array condition
                if (Array.isArray(conditionNode) && !isInsideArray) {
                    result = PolicyCondition._processArrayCondition(
                        data,
                        condition,
                        conditionNode,
                        conditionValue,
                        condition === PolicyRuleCondition.HAS_SOME_VALUE,
                        policyManager
                    );
                    break;
                }

                // Check if the node has value
                result = !!GetObjectProperty(data, conditionNode);

                if (conditionValue !== undefined) {
                    // Check if the node value matches
                    result = PolicyCondition._checkValueMatch(
                        data,
                        conditionNode,
                        conditionValue
                    );
                }

                break;
            case PolicyRuleCondition.NOT_HAS_VALUE:
            case PolicyRuleCondition.NOT_SOME_HAS_VALUE:
                // If condition node is array then process the array condition
                if (Array.isArray(conditionNode) && !isInsideArray) {
                    result = PolicyCondition._processArrayCondition(
                        data,
                        condition,
                        conditionNode,
                        conditionValue,
                        condition === PolicyRuleCondition.NOT_SOME_HAS_VALUE,
                        policyManager
                    );
                    break;
                }

                // Check if the node not has value
                result = !GetObjectProperty(data, conditionNode);

                if (conditionValue !== undefined) {
                    // Check if the node not value matches
                    result = !PolicyCondition._checkValueMatch(
                        data,
                        conditionNode,
                        conditionValue
                    );
                }
                break;
            case PolicyRuleCondition.IS_DISABLED:
                // If condition node is array then process the array condition
                if (Array.isArray(conditionNode) && !isInsideArray) {
                    result = PolicyCondition._processArrayCondition(
                        data,
                        condition,
                        conditionNode,
                        conditionValue,
                        false,
                        policyManager
                    );
                    break;
                }

                // Check if the node is disabled
                result = policyManager.isNodeDisable(conditionNode as any);

                break;
            default:
                return false;
        }

        return result;
    };

    private static _checkValueMatch = (data, conditionNode, conditionValue) => {
        if (Array.isArray(conditionValue)) {
            let result = false;
            for (const value of conditionValue) {
                result = GetObjectProperty(data, conditionNode) === value;
                if (result) break;
            }
            return result;
        }
        return GetObjectProperty(data, conditionNode) === conditionValue;
    };

    /**
     * Process the array of condition for a node
     *
     * @param data data to process
     * @param condition the condition to process
     * @param conditionNode the condition nodes
     * @param conditionValue the condition value
     * @param isOr is or condition
     * @returns conditions result
     */
    private static _processArrayCondition = (
        data: ObjectDto,
        condition: PolicyRuleCondition,
        conditionNode: string | string[],
        conditionValue: any,
        isOr: boolean,
        policyManager: PolicyManager
    ) => {
        let arrayResult = isOr ? false : true;

        for (let node of conditionNode) {
            const currState = PolicyCondition.processCondition(
                data,
                condition,
                node,
                conditionValue,
                policyManager,
                true
            );

            // If is or condition then return if any node is true.
            if (isOr) {
                if (currState) {
                    arrayResult = true;
                    break;
                } else {
                    continue;
                }
            }
            if (!currState) {
                arrayResult = false;
                break;
            }
        }
        return arrayResult;
    };
}

const IsPolicyRule = (rule: unknown): rule is PolicyRule => {
    if (rule.hasOwnProperty('ruleType')) {
        return true;
    }
    return false;
};
