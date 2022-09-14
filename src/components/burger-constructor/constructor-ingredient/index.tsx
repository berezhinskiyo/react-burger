import { FC, useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from '../../../hooks';
import styles from './constructor-ingredient.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { constructorIngredientType } from '../../../services/types'
import { moveIngredient } from '../../../services/store/constructorSlice';


const ConstructorIngredient : FC<
{
    text: string; 
    price: number;
    thumbnail: string; 
    index: number;
    handleClose : ()=> void;
}> = ({ text, price, thumbnail, index, handleClose }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "ConstructorIngredient",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item , monitor) {
            if (!ref.current) return


            const dragIndex = (item as {index: number}).index;
            const hoverIndex = index

            if (dragIndex === hoverIndex) return

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY =clientOffset !== null ? clientOffset.y - hoverBoundingRect.top :hoverBoundingRect.top;

            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return
            }
            dispatch(moveIngredient({
                dragIndex: dragIndex,
                hoverIndex: hoverIndex
            }));


            (item as {index: number}).index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "ConstructorIngredient",
        item: () => {

            return {
                index: index
            }
        },
        collect: (monitor) => {

            return {
                isDragging: monitor.isDragging(),
            }
        },
    })

    drag(drop(ref))
    return (
        <li ref={ref} data-handler-id={handlerId} className={`${styles.constructor__element}`}>
            <span className="pr-4">
                <DragIcon type="primary" />
            </span>
            <div className={`${styles.item} pr-4`} >
                <ConstructorElement
                    text={text}
                    price={price}
                    thumbnail={thumbnail}
                    handleClose={handleClose}
                />
            </div>
        </li>
    );
}

//ConstructorIngredient.propTypes = constructorIngredientType;

export default ConstructorIngredient;