import React from "react";

export interface ValeriaCardKingdomsCardProps {
  title: string;
  imgSrc: string;
}

export function ValeriaCardKingdomsCardDisplay(props: ValeriaCardKingdomsCardProps): React.ReactElement {
  const { title, imgSrc } = props;

  return (
    <div className="card-display">
      <div className="card-display--title">{title}</div>
      <img className="card-display--image" src={imgSrc} alt="" />
    </div>
  );
}
