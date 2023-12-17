

const ContactUs = () => {
    return (

        <div className="mt-10 mb-10">
            <h2 className="text-3xl text-black font-medium text-center">Subscribe and stay updated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-10 bg-slate-400 rounded-3xl">
            <div className=" items-center p-10">
                <h1 className="text-3xl text-left font-bold text-white">Subscribe to blog writer newsletter and stay updated.</h1>
                <p className="text-xl text-left  font-medium text-white mt-8">Dont miss anything. Get all the latest posts delivered straight to your inbox. Its free!</p>
            </div>
            <div>
                <div className="card ">
                    <form className="card-body p-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                name="name"
                                placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name="email"
                                placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>
            <div />

        </div>
        </div>
    );
};

export default ContactUs;