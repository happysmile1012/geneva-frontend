"use client"
import { CrossmintEmbeddedCheckout, CrossmintProvider, useCrossmintCheckout, CrossmintCheckoutProvider } from "@crossmint/client-sdk-react-ui";
import {useState, useEffect} from "react";
function Subscribe({email}) {
    const { order } = useCrossmintCheckout();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [successed, setSuccessed] = useState(false);
    const [price, setPrice] = useState(0);
    useEffect(() => {
        console.log("--------Order-----------")
        console.log(order);
        if (order && order.phase === "completed") {
            console.log("Purchase completed!");
            setSuccessed(true);
            console.log(order);
        }
    }, [order]);

    useEffect(() => {
        getSolanaPrice()
    }, [])

    async function getSolanaPrice() {
        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
            );
            const data = await response.json();
            const sol_price =  data.solana.usd; // Current SOL price in USD
            setPrice((12 / sol_price));
        } catch (error) {
            return 0;
        }
    }

    return successed? <div>
        <div className="font-bold" align="center" style={{fontSize: "30px"}}>
            Successed!
        </div>
    </div> : <div>
        <div className="font-bold" align="center" style={{fontSize: "30px"}}>
            Ah, the limits the limits!
        </div>
        <div algin="center" style={{fontSize: "25px", fontWeight: 500,marginTop: "30px"}}>
            To continue using our Consensus Engine for trusted high-quality search, a non-recurring payment of $12 (valid for 30 days) is required.
        </div>
        <div className="flex items-center justify-center gap-[20] mt-[25px]" align="center">
            <img src="/image/logo.png"  style={{width: "50px"}}/>
            <div className="font-bold">
                $12. 1 time. Valid for 30 days.
            </div>
        </div>
        <div className="flex mt-4">
            <div className={`py-2 px-4 text-[20px] ${paymentMethod == "card" ? "bg-amber-200" : "transparent"} rounded-md cursor-pointer`}
                onClick={() => {
                    setPaymentMethod("card")
                }}
            >Card</div>
            <div className={`py-2 px-4 text-[20px] ${paymentMethod == "crypto" ? "bg-amber-200" : "transparent"} rounded-md cursor-pointer`}
                 onClick={() => {
                     setPaymentMethod("crypto")
                 }}
            >Crypto</div>
        </div>
        <div className="mt-[30px]">
            {
                paymentMethod == "card" ?
                    <CrossmintEmbeddedCheckout
                        lineItems={{
                            collectionLocator: `crossmint:${process.env.NEXT_PUBLIC_COLLECT_ID}`,
                            callData: {
                                totalPrice: price.toString(),
                                quantity: 1,
                            },
                        }}
                        payment={{
                            crypto: {
                                enabled: false
                            },
                            fiat: {
                                enabled: true,
                                // By default, all payment methods are enabled if you don't specify any.
                                allowedMethods: {
                                    card: true, // Enable/disable credit cards
                                    applePay: true, // Enable/disable Apple Pay
                                    googlePay: true, // Enable/disable Google Pay
                                },
                                defaultCurrency: "usd" // Set default currency
                            },
                            receiptEmail: email
                        }}
                        recipient={{
                            email: email
                        }}
                    />
                    :
                    <CrossmintEmbeddedCheckout
                        lineItems={{
                            collectionLocator: `crossmint:${process.env.NEXT_PUBLIC_COLLECT_ID}`,
                            callData: {
                                totalPrice: price.toString(),
                                quantity: 1,
                            },
                        }}
                        payment={{
                            crypto: {
                                enabled: true, // Enable crypto payments
                            },
                            fiat: {
                                enabled: false
                            },
                            receiptEmail: email
                        }}
                        recipient={{
                            email: email,
                        }}
                    />
            }
        </div>
    </div>
}

export default  Subscribe;