import { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import styles from './constructor-ingredient.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {
    CONSTRUCTOR_MOVE
} from '../../../services/actions';

const ConstructorIngredient = ({ ingredient, type, text, price, thumbnail, index, handleClose }) => {
    const dispatch = useDispatch();
    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "ConstructorIngredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) return


            const dragIndex = item.index;
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return
            }

            dispatch({
                type: CONSTRUCTOR_MOVE,
                dragIndex: dragIndex,
                hoverIndex: hoverIndex
            });

            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "ConstructorIngredient",
        item: () => {

            return {
                index: index,
                id: index
            }
        },
        collect: (monitor) => {

            return {
                isDragging: monitor.isDragging(),
            }
        },
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <li ref={ref} style={{ opacity: opacity }} data-handler-id={handlerId} className={`${styles.constructor__element}`} key={ingredient._id + index}>
            <span className="pr-4">
                <DragIcon type="primary" />
            </span>
            <div className={`${styles.item} pr-4`} >
                <ConstructorElement
                    type={type}
                    key={index}
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                    handleClose={handleClose}
                />
            </div>
        </li>
    );
}
export default ConstructorIngredient;