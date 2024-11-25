import React, { useContext, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";

import AddressForm from "./Forms/AddressForm";
import PaymentForm from "./Forms/PaymentForm";
import ReviewOrder from "./ReviewOrder";
import CheckoutSuccess from "./CheckoutSuccess";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Auth/AuthContext";


import validationSchema from "./FormModel/validationSchema";
import checkoutFormModel from "./FormModel/checkoutFormModel";
import formInitialValues from "./FormModel/formInitialValues";

import useStyles from "./styles";
import CreditCardForm from "./Forms/CreditCardForm";


export default function CheckoutPage(props) {
  const steps = ["Dados do assinante", "Dados de pagamento", "Dados do plano", "Revisar"];
  const { formId, formField } = checkoutFormModel;



  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [datePayment, setDatePayment] = useState(null);
  const [invoiceId, setinvoiceId] = useState(props.Invoice.id);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length -1;
  const { user } = useContext(AuthContext);

function _renderStepContent(step, setFieldValue, setActiveStep, values ) {

  switch (step) {
    case 0:
      return <AddressForm formField={formField} values={values} setFieldValue={setFieldValue}  />;
    case 1:
      return (
          <CreditCardForm
              formField={{
                cardHolderNameField: { name: "cardHolderName", label: "Nome no Cartão" },
                cardNumberField: { name: "cardNumber", label: "Número do Cartão" },
                expirationDateField: { name: "expirationDate", label: "Data de Validade" },
                cvvField: { name: "cvv", label: "CVV" },
              }}
              setFieldValue={setFieldValue} // Isso deve ser a função que você usa para atualizar os valores do formulário
          />
      );

    case 2:
      return <PaymentForm
      formField={formField}
      setFieldValue={setFieldValue}
      setActiveStep={setActiveStep}
      activeStep={step}
      invoiceId={invoiceId}
      values={values}
      />;
    case 3:
      return <ReviewOrder />;
    default:
      return <div>Not Found</div>;
  }
}


  async function _submitForm(values, actions) {
    try {
      const plan = JSON.parse(values.plan);
      const newValues = {
        asaasCustomerId: user.assasCustomerId,
        firstName: values.firstName,
        lastName: values.lastName,
        address2: values.address2,
        city: values.city,
        state: values.state,
        zipcode: values.zipcode,
        country: values.country,
        useAddressForPaymentDetails: values.useAddressForPaymentDetails,
        nameOnCard: values.cardHolderName,
        cardNumber: values.cardNumber,
        cvv: values.cvv,
        expirationDate: values.expirationDate,
        plan: values.plan,
        price: plan.price,
        users: plan.users,
        connections: plan.connections,
        invoiceId: invoiceId
      }
// console.log(newValues)
      const { data } = await api.post("/subscription", newValues);
      setDatePayment(data)
      actions.setSubmitting(false);
      setActiveStep(activeStep + 1);
      toast.success("Assinatura realizada com sucesso!, aguardando a realização do pagamento");
    } catch (err) {
      toastError(err);
    }
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Falta pouco!
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <CheckoutSuccess pix={datePayment} />
        ) : (
          <Formik
            initialValues={{
              ...user,
              ...formInitialValues
            }}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep, setFieldValue, setActiveStep, values)}

                <div className={classes.buttons}>
                  {activeStep !== 1 && (
                    <Button onClick={_handleBack} className={classes.button}>
                      VOLTAR
                    </Button>
                  )}
                  <div className={classes.wrapper}>

                      <Button
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        {isLastStep ? "PAGAR" : "PRÓXIMO"}
                      </Button>

                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
