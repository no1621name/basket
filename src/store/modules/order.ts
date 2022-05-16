interface FormData {
  clientFullName: string,
  clientEmail: string,
  clientComment?: string,
  payMethod: string,
  cardNumber?: number,
  cardCVV?: number,
  cardValidity?: number,
  paypalWalletNumber?: number,
  paypalPassword?: `${number & string}`
}

interface FormValidation {
  [index: string]: RegExp,
}

class FormData {
  constructor(obj: FormData) {
    return { ...obj }
  }
}

class FormValidation {
  constructor(obj: FormValidation) {
    return { ...obj }
  }
}

const orderStore = {
  state: {
    formData: new FormData({
      clientFullName: '',
      clientEmail: '',
      payMethod: '',
    }),
  },
  getters: {
    formData: ({formData}: any) => formData,
    formVlidation: ({formVlidation}: any) => formVlidation,
  },
  mutations: {
  },
  actions: {
  },
};

export default orderStore;