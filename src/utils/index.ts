export const hasOwnProperty = (object: object, propertyName: string) => {
  return Object.prototype.hasOwnProperty.call(object, propertyName);
};
