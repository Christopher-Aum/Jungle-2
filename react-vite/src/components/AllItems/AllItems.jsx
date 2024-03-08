import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetItems } from "../../redux/item";
import MiniatureSingleItem from "../MiniatureSingleItem/MiniatureSingleItem";
import './AllItem.css'

function AllItems(){
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.items)

    useEffect(()=> {
        dispatch(thunkGetItems())
    }, [])

    function AllItemsItems(){
        const res = []
        for (let item of Object.values(items)){
            res.push([item])
        }
        // console.log('result array', res)
        return res;
    }

    return (
        <>
        {/* <div className="Computer-Items"> */}
        { AllItemsItems().map((el) => {
            return <div className="AllItem-Item" key={el[0].id}><MiniatureSingleItem key={el[0].id} item={el[0]} /></div>
        })}
        {/* </div> */}
        </>
    )
}

export default AllItems
