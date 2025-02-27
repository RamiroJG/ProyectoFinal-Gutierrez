import { IoPersonOutline } from "react-icons/io5";
import { RxPerson } from "react-icons/rx";

import { IoCartOutline } from "react-icons/io5";

import './CartWidget.css'


const CartWidget = () => {
    return (
        <div className="widgets">
            <RxPerson />
            <IoCartOutline />
        </div>
    )
}

export default CartWidget