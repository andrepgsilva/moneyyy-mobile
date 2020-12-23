interface styleInterface {
  [index: string]: object
}

const style: styleInterface = {
  flexOne: {
    flex: 1
  },

  flexRow: {
    flexDirection: 'row'
  },

  justifyCenter: {
    justifyContent: 'center'
  },

  justifyBetween: {
    justifyContent: 'space-between'
  },

  justifyAround: {
    justifyContent: 'space-around'
  },

  itemsCenter: {
    alignItems: 'center'
  },

  textCenter: {
    textAlign: 'center'
  }
};

export default style;
