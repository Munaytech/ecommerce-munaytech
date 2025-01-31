// components/StarRating.js
import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const totalStars = 5; // Total de estrellas
  const fullStars = Math.floor(rating); // Número de estrellas llenas
  const fractionalPart = rating % 1; // Parte decimal del número
  const emptyStars = totalStars - fullStars - (fractionalPart > 0 ? 1 : 0); // Estrellas vacías

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Estrellas llenas */}
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          viewBox="0 0 51 48"
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            style={{ fill: "#FFC102", transition: "fill 0.2s ease-in-out" }} // Amarillo
          ></path>
        </svg>
      ))}

      {/* Estrella parcial */}
      {fractionalPart > 0 && (
        <svg
          viewBox="0 0 51 48"
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="partialStar">
              <stop offset={`${fractionalPart * 100}%`} stopColor="#FFC102" />{" "}
              {/* Amarillo */}
              <stop
                offset={`${fractionalPart * 100}%`}
                stopColor="#CBD3E3"
              />{" "}
              {/* Gris */}
            </linearGradient>
          </defs>
          <path
            d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            style={{
              fill: "url(#partialStar)",
              transition: "fill 0.2s ease-in-out",
            }}
          ></path>
        </svg>
      )}

      {/* Estrellas vacías */}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          viewBox="0 0 51 48"
          width="14"
          height="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            style={{ fill: "#CBD3E3", transition: "fill 0.2s ease-in-out" }} // Gris
          ></path>
        </svg>
      ))}
      {/* <p className="text-[#68717D] font-lato text-[13px] font-normal leading-[24px]">
        {rating}
      </p> */}
    </div>
  );
};

export default StarRating;
