import { useQuery } from "@tanstack/react-query";
import UseAxios from "../assets/hooks/UseAxios";


const Services = () => {
const axiosUrl= UseAxios();

    const { data: services=[] } = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const res = await axiosUrl.get("/service");
            return res.data;
        },
    });
    return (
       <div className="mt-5 bg-white">
        <h2 className="text-2xl text-black font-medium text-center mb-5">Our services</h2>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3  ">
            {services.map((service)=><div key={service._id} className="card w-70  shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={service.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{service.heading}</h2>
                    <p>{service.des}</p>
                </div>
            </div>)}
        </div>
       </div>
    );
};

export default Services;