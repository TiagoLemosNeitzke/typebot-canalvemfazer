import * as Yup from 'yup';
import checkoutFormModel from './checkoutFormModel';

const {
    formField: {
        // firstName,
        // address1,
        // city,
        // zipcode,
        // cnpj,
        // country,
    }
} = checkoutFormModel;


export default [
    Yup.object().shape({
        // [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
        // [address1.name]: Yup.string().required(`${address1.requiredErrorMsg}`),
        /*[city.name]: Yup.string()
            .nullable()
            .required(`${city.requiredErrorMsg}`),*/
       /* [zipcode.name]: Yup.string()
            .required(`${zipcode.requiredErrorMsg}`),
        [cnpj.name]: Yup.string()
            .required(`${cnpj.requiredErrorMsg}`),*/
        /*[country.name]: Yup.string()
            .nullable()
            .required(`${country.requiredErrorMsg}`)*/
    }),

];
