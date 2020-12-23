interface dynamicStyleInterface {
  [index: string]: object;
}

interface styleNamesMappedInterface {
  [index: string]: string;
}

interface stylePropertyInterface {
  [index: string]: number;
};

const dynamicStyles: dynamicStyleInterface = {};

const styleNamesMapped: styleNamesMappedInterface = {
  mt: 'marginTop',
  '-mt': 'marginTop',
  mb: 'marginBottom',
  '-mb': 'marginBottom',
  mr: 'marginRight',
  '-mr': 'marginRight',
  ml: 'marginLeft',
  '-ml': 'marginLeft',
  pt: 'paddingTop',
  '-pt': 'paddingTop',
  pb: 'paddingBottom',
  '-pb': 'paddingBottom',
  pr: 'paddingRight',
  '-pr': 'paddingRight',
  pl: 'paddingLeft',
  '-pl': 'paddingLeft'
};

for (let i = 0; i < 101; i++) {
  Object.keys(styleNamesMapped).forEach(styleNameKey => {
    const propertyToAdd: stylePropertyInterface = {};

    let factor: number = i;
    if (styleNameKey.includes('-')) factor *= -1;

    propertyToAdd[styleNamesMapped[styleNameKey]] = factor;

    dynamicStyles[`${styleNameKey}-${i}`] = propertyToAdd;
  });
};

export default dynamicStyles;
