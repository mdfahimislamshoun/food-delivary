import Swal from "sweetalert2";
import UseAxios from "../assets/hooks/UseAxios";

const AddProduct = () => {
const axiosUrl=UseAxios()
  const handleProductData = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const title=form.title.value
    const image = form.image.value;
    const productData = { name, price,title,image };
    console.log(productData);
    axiosUrl.post("/product", productData)
    .then((response) => {
        if (response.data.insertedId) {
            return Swal.fire(
                "Good job!",
                "Your product added successfully!",
                "success"
            );
        }
    })
  };
  return (
    <div className="container w-[95%]  h-screen justify-center mx-auto mt-20">
      <form onSubmit={handleProductData}>
        <div className="flex">
          
          <div className="form-control  md:w-full  ml-3">
            <label className="label">
              <span className="label-text"> Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              className="input input-bordered border border-x-fuchsia-100 w-full"
            />
          </div>
          
          <div className="form-control md:w-full ml-3 ">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              className="input input-bordered border border-x-fuchsia-100 w-full"
            />
          </div>
        </div>
        <div className="flex">
          <div className="form-control  md:w-full ">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter product title hear"
              className="input input-bordered border border-x-fuchsia-100 w-full"
            />
          </div>
        </div>
        <div className="flex">
          <div className="form-control  md:w-full ">
            <label className="label">
              <span className="label-text">Photo URl</span>
            </label>
            <br />
            <input
              type="text"
              name="image"
              placeholder="Enter photo URL"
              className="input input-bordered border border-x-fuchsia-100 w-full"
            />
          </div>
        </div>

        <input
          className="w-full text-[#331A15] bg-[#D2B48C] mt-8 p-4"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;
