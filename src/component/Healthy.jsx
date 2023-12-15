import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";
import Swal from "sweetalert2";

const Healthy = () => {
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
        const productData = { image, name, title, price };
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
        <div>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                {product.map((product) => <div key={product._id} className="card w-70  shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={product.image} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{product.name}</h2>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </div>
                    <button onClick={() => handleProductData(product._id)} className="btn btn-primary">Buy Now</button>
                </div>)}
            </div>
        </div>
    );
};

export default Healthy;