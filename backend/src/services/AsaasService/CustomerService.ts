import axios from "axios";
import assasConfig from '../../config/asaas'

const asaasApi = axios.create({
  baseURL: assasConfig.asaas_url,
  headers: {
    Authorization: `Bearer ${assasConfig.assas_api_key}`,
  },
});

export const customerService = async (data: any) => {
  const response = await asaasApi.post("/customers", data);
  return response.data;
};

export const getCustomerInvoices = async (customerId: string) => {
  const response = await asaasApi.get(`/customers/${customerId}/payments`);
  return response.data;
};

export const createCardToken = async (cardData: any) => {
  const response = await asaasApi.post("/creditCard/tokenize", cardData);
  return response.data;
};

export const createSubscription = async (subscriptionData: any) => {
  const response = await asaasApi.post("/subscriptions", subscriptionData);
  return response.data;
};
