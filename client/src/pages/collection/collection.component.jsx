import React from "react";
import './collection.styles.scss';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selector";

const CollectionPage = () => {
    const { collectionId }= useParams()
    const collection = useSelector(selectCollection(collectionId))
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {items.map((item, index) => <CollectionItem key={index} item={item} />)}
            </div>
        </div>
    )
}

export default CollectionPage;