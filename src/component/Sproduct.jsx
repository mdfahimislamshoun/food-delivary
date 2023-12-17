/* eslint-disable react/prop-types */


const SProduct = ({Image, Description}) => {
  return (
    <div className="card shadow-sm bg-slate-50">
      <img src={Image} alt="" style={{height: "200px"}}/>
      <div className="card-body">
        <p>{Description}</p>
      </div>
    </div>
  );
};

export default SProduct;
