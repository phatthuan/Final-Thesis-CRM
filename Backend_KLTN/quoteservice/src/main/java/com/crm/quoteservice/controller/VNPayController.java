package com.crm.quoteservice.controller;

import java.math.BigDecimal;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.crm.quoteservice.command.command.CreateQuoteCommand;
import com.crm.quoteservice.service.VNPayService;

@Controller
public class VNPayController {
    @Autowired
    private VNPayService vnPayService;

    @Autowired
    private CommandGateway commandGateway;

    @GetMapping("/api/VNPay")
    public String home() {
        return "index";
    }

    @PostMapping("/api/VNPay/submitOrder")
    public String submidOrder(@RequestParam("amount") int orderTotal,
            @RequestParam("orderInfo") String orderInfo,
            HttpServletRequest request) {
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(orderTotal, orderInfo, baseUrl);
        return "redirect:" + vnpayUrl;
    }

    @GetMapping("/api/VNPay/vnpay-payment")
    public String GetMapping(HttpServletRequest request, Model model) {
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        if (paymentStatus == 1) {
            CreateQuoteCommand command = new CreateQuoteCommand(
                    UUID.randomUUID().toString(),
                    "VNPay",
                    orderInfo,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    new BigDecimal(totalPrice),
                    null,
                    null,
                    null,
                    true);
            commandGateway.sendAndWait(command);
            return "ordersuccess";
        } else {
            return "orderfail";
        }
    }
}
