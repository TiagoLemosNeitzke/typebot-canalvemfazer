import checkoutFormModel from './checkoutFormModel';

const {
    formField: {
        // firstName,
        // address1,
        // cnpj,
        // city,
        // state,
        // country,
        useAddressForPaymentDetails,
        nameOnCard,
        cardNumber,
        invoiceId,
        cvv
    }
} = checkoutFormModel;

export default {
    // [firstName.name]: '',
    // [address1.name]: '',
    // [city.name]: '',
    // [state.name]: '',
    // [cnpj.name]: '',
    // [country.name]: '',
    [useAddressForPaymentDetails.name]: false,
    [nameOnCard.name]: '',
    [cardNumber.name]: '',
    [invoiceId.name]: '',
    [cvv.name]: ''
};
