import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
const Healthy = () => {
    const { user } = useContext(AuthContext);
    const uemail=user?.email;

    const axiosUrl = UseAxios();

    const { data: product = [], refetch } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await axiosUrl.get("/product");
            return res.data;
        },
    });


    const handleProductData = (id) => {
        const targetProduct = product.filter(product => product._id === id);
        console.log(targetProduct);
        const image = targetProduct[0]?.image;
        const name = targetProduct[0]?.name;
        const title = targetProduct[0]?.title;
        const price = targetProduct[0]?.price;
        const email= uemail;
        const status="pending"
        const productData = { image, name, title, price,status,email };
        axiosUrl.post("/order", productData)
            .then((response) => {
                if (response.data.insertedId) {
                    return Swal.fire(
                        "Good job!",
                        "Your order added successfully!",
                        "success"
                    );
                }
            })
    };
    refetch()
    console.log(product);
    return (
        <div className="mt-10 mb-3">
            <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                {product.map((product) => <div key={product._id} className="card w-70  shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={product.image} alt="Shoes" className="w-full h-44 rounded-none" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </div>
                    <button onClick={() => handleProductData(product._id)} className="btn btn-primary">Add to card</button>
                </div>)}
            </div>
        </div>
    );
};

export default Healthy;