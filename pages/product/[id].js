import { useRouter } from "next/router";

const ProductDetails = ()=>{
    const router = useRouter();
    const {id} = router.query;
    return(
        <center>{id}</center>
    )
}

export default ProductDetails