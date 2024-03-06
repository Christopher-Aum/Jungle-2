import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItems } from "../../redux/item";

function HomePage(){
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)

    useEffect(()=> {
        dispatch(thunkGetItems())
    }, [])

    function HomePageItems(){
        const res = []
        for (let item of Object.values(items)){
            res.push(['item', item])
        }
        console.log(res)
        return res;
    }

    if (!items) return 'Loading...'
    return (
        <>
        {/* {HomePageItems().map((el, i) => {

        })} */}
        <h1>Dummy Code</h1>
        </>
    )
}

export default HomePage
