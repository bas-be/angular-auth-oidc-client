import { OpenIdConfiguration } from '../../openid-configuration';
import { POSITIVE_VALIDATION_RESULT, RuleValidationResult } from '../rule';

const createIdentifierToCheck = (passedConfig: OpenIdConfiguration): string => {
  const { authority, clientId, scope } = passedConfig;

  return `${authority}${clientId}${scope}`;
};

const arrayHasDuplicates = (array: string[]): boolean => new Set(array).size !== array.length;

export const ensureNoDuplicatedConfigsRule = (passedConfigs: OpenIdConfiguration[]): RuleValidationResult => {
  const allIdentifiers = passedConfigs.map((x) => createIdentifierToCheck(x));

  const hasDuplicates = arrayHasDuplicates(allIdentifiers);

  if (hasDuplicates) {
    return {
      result: false,
      messages: ['You added multiple configs with the same authority, clientId and scope'],
      level: 'warning',
    };
  }

  return POSITIVE_VALIDATION_RESULT;
};
