import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "./AuthProvider";
import { Box, Skeleton } from "@mui/material";
const Private = ({children}) => {
    const { user} = useContext(AuthContext);
    const location=useLocation();
    const{loading}=useContext(AuthContext)

    if(loading){
        return <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
     }
        if(user){
            return children;
        }
        
        return <Navigate state={location.pathname} to="/signIn"></Navigate>
    };
Private.propTypes={
    children:PropTypes.node
}
export default Private;