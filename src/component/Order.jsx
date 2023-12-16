import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";


const Order = () => {
    const axiosUrl=UseAxios();


    const { data: orders = [],refetch} = useQuery({
        queryKey: ["order"],
        queryFn: async () => {
            const res = await axiosUrl.get("/order");
            return res.data;
        },
    });
    
    refetch()


    return (
        <div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {orders.map((order) => <div key={order._id} className="card w-70  shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={order.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{order.name}</h2>
                    <p>{order.title}</p>
                    <p>{order.price}</p>
                </div>
                <button className="btn btn-primary">Buy Now</button>
            </div>)}
        </div>
    </div>
    );
};

export default Order;