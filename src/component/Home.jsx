
import { useQuery } from "@tanstack/react-query";
import image1 from "../assets/Images/hero1.png"
import UseAxios from "../assets/hooks/UseAxios";
import AddProduct from "./AddProduct";
import Services from "./Services";
import { Link } from "react-router-dom";
import Healthy from "./Healthy";
import Swal from "sweetalert2";
const Home = () => {

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
    console.log(product);
    refetch()
    return (
        <div>
            <div className="hero min-h-screen  bg-white">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src={image1} className="max-w-sm rounded-lg" />
                    <div>
                        <h1 className="text-4xl font-bold">Your Online Farmers Market</h1>
                        <p className="py-6 text-xl">We deliver organic vegetables fresh from
                            <br />our fields to your doorstep.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <div  >
                <h2>our product</h2>
              <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
              {product.slice(0, 3).map((product) => <div key={product._id} className="card w-70  shadow-xl">
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
           <div className="flex items-center justify-center">
           <Link to="/healthy">
             <button className="text-xl btn btn-prymary ">show All Product</button> </Link> 
             </div>     
            </div>
            <Services></Services>


        </div>
    );
};

export default Home;