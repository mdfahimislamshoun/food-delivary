
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";
import Swal from "sweetalert2";


const Delivery = () => {
    const axiosUrl = UseAxios();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosUrl.get("/order");
            return res.data;
        },
    });

    const handelProductCanceled = (id) => {
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
                                    "Your order has been canceled.",
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

    const handleConfirm = (id) => {
        axiosUrl.delete(`/order/${id}`)
            .then((response) => {
                if (response.data.deletedCount > 0) {
                    Swal.fire(
                        "Deleted!",
                        "Your delivery is confirmed.",
                        "success"
                    );
                    refetch(); // Assuming refetch is defined in your scope
                }
            })
            .catch((error) => {
                console.error("Error confirming delivery:", error);
                // Handle error if necessary
            });
    };

    return (
        <div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-[90%] justify-center mx-auto">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>price</th>
                        <th>status</th>
                        <th>Confirm delivery</th>
                        <th>canceled order</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((p, index) => <tr key={p._id}>
                            <th>{index + 1}</th>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>{p.status}</td>
                            {
                                p.status ==="delivered"?<td>
                                <button onClick={() => handleConfirm(p._id)}
                                    className="btn btn-ghost btn-lg">
                                   Confirm
                                </button>
                            </td>:""
                            }
                            {
                                 p.status ==="pending"? <td>
                                 <button onClick={() => handelProductCanceled(p._id)}
                                     className="btn btn-ghost btn-lg">
                                     canceled
                                 </button>
                             </td>:""
                            }
                            
                           

                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Delivery;