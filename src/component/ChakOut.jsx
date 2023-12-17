
import { useQuery } from "@tanstack/react-query";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import UseAxios from "../assets/hooks/UseAxios";



const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosUrl = UseAxios()

    const { data: orders = [] } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosUrl.get("/order");
            return res.data;
        },
    });

    const totalSum = orders.reduce((sum, order) => {
        const orderPrice = parseFloat(order.price);
        return sum + orderPrice;
    }, 0);

    console.log('Total sum of prices:', totalSum);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }


    }

    return (
        <div className=" w-[60%] justify-center mx-auto  mt-4 p-4 bg-red-200">
            <form onSubmit={handleSubmit} className="p-10">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary mt-1" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            <h2 className="text-center">you have to pay ${totalSum} </h2>
        </div>

    );
};



export default CheckOutForm;