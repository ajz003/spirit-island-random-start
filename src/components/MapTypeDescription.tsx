import React from "react";
import { ARCHIPELAGOS, PANGAEA } from "../constants";
import pangaeaImage from "./pangaea.png";
import archipelagoImage from "./archipelago.png";
import "./MapTypeDescription.css";

type DescriptionProps = {
  image: string;
  text: string;
};

type MapTypeDescriptionProps = {
  mapType: string;
};

function Description({ image, text }: DescriptionProps) {
  return (
    <>
      <img src={image} className="map-type-description-image" alt="" />
      <p className="map-type-description-text">{text}</p>
    </>
  );
}

function PangaeaDescription() {
  return <Description image={pangaeaImage} text="One massive landmass" />;
}

function ArchipelagoDescription() {
  return <Description image={archipelagoImage} text="Multiple islets" />;
}

function MapTypeDescription({ mapType }: MapTypeDescriptionProps) {
  return (
    <div className="map-type-description">
      {mapType === PANGAEA && <PangaeaDescription />}
      {mapType === ARCHIPELAGOS && <ArchipelagoDescription />}
    </div>
  );
}

export default MapTypeDescription;
