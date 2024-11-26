import { Request, Response } from "express";

import User from "../models/User";

// @ts-ignore
export const handleSubscription = async (req: Request, res: Response): Promise<Response> => {
  console.log(req)
  /*try {
    const userId = req.user.id;
    const { cardNumber, cardHolderName, cardCvv, cardExpiryMonth, cardExpiryYear, planId } = req.body;

    // Verifica se o usuário possui um `customerId` no Asaas
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.asaasCustomerId) {
      // Cria o cliente no Asaas
      const customer = await customerService({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });

      // Atualiza o usuário com o customerId
      user.asaasCustomerId = customer.id;
      await user.save();
    }

    // Obtém as faturas em aberto do cliente
    const invoices = await getCustomerInvoices(user.asaasCustomerId);
    const openInvoices = invoices.data.filter((invoice: any) => invoice.status === "PENDING");

    if (openInvoices.length > 0) {
      return res.status(400).json({ error: "You have open invoices." });
    }

    // Cria um token para o cartão de crédito
    const cardToken = await createCardToken({
      cardNumber,
      holderName: cardHolderName,
      expirationMonth: cardExpiryMonth,
      expirationYear: cardExpiryYear,
      ccv: cardCvv,
    });

    user.asaasCardToken = cardToken.id;
    await user.save();

    // Cria a assinatura
    const subscription = await createSubscription({
      customer: user.asaasCustomerId,
      billingType: "CREDIT_CARD",
      nextDueDate: new Date().toISOString().split("T")[0],
      value: 49.99, // Valor do plano
      cycle: "MONTHLY",
      creditCardToken: user.asaasCardToken,
      description: `Subscription for plan ${planId}`,
    });

    return res.status(200).json(subscription);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }*/
};
