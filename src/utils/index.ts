import i18n from '../i18n';

export const hasOwnProperty = (object: object, propertyName: string) => {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
};

export const formatAuthErrors = (action: any) => {
  let errors: Array<string> = [action.payload.error];

  if (hasOwnProperty(action.payload, 'errors')) {
    errors = [];

    let fieldErrorPropertyName: string = '';

    for (fieldErrorPropertyName in action.payload.errors) {
      const fieldErrorPropertyValue = action.payload.errors[fieldErrorPropertyName];
      errors.push(fieldErrorPropertyValue[0]);
    }
  }

  return errors;
};

export const AuthErrorsHandler = (state: any, action: any) => {
  if (typeof action.payload === 'object') {
    state.serverAuthErrors = formatAuthErrors(action);

    return;
  }

  state.serverAuthErrors.push(i18n.t('auth.something_went_wrong'));
};
