import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./ChakOut";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const OrderConfirm = () => {
    const { user } = useContext(AuthContext);
    const email=user?.email;
    const axiosUrl = UseAxios();


    const { data: orders = [], refetch } = useQuery({
        queryKey: ["order",email],
        queryFn: async () => {
            const res = await axiosUrl.get(`/order?email=${email}`);
            return res.data;
        },
    });

    const handelProductDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });

        swalWithBootstrapButtons
            .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosUrl.delete(`/order/${id}`)
                        .then((response) => {
                            if (response.data.deletedCount > 0) {
                                swalWithBootstrapButtons.fire(
                                    "Deleted!",
                                    "Your product/asset has been deleted.",
                                    "success",
                                    refetch()
                                );
                            }
                        });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        "Cancelled",
                        "Your imaginary file is safe :)",
                        "error"
                    );
                }
            });
    }

    return (
        <div>
            <div className="mt-10 mb-5">
                <Elements stripe={stripePromise}>
                    <CheckOutForm />
                </Elements>

            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-[90%] justify-center mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>price</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((p, index) => <tr key={p._id}>
                                <th>{index + 1}</th>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>

                                    <button onClick={() => handelProductDelete(p._id)}
                                        className="btn btn-ghost btn-lg">
                                        remove
                                    </button>

                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderConfirm;