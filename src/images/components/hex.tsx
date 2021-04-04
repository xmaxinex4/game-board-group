import * as React from 'react'

export interface IHexIconProps {
    fill?: string;
    height?: number;
    width?: number;
    className?: string;
}

export const HexIcon = (props: IHexIconProps) => (
    <svg className={props.className || ""} height={props.height ? `${props.height}px` : "250px"} width={props.width ? `${props.width}px` : "250px"} fill={props.fill || "#000000"} xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0.0 0.0 168.65879265091863 168.21784776902888" stroke="none" stroke-linecap="square" stroke-miterlimit="10">
        <clipPath id="p.0">
            <path d="m0 0l168.6588 0l0 168.21785l-168.6588 0l0 -168.21785z" clip-rule="nonzero" />
        </clipPath>
        <g clip-path="url(#p.0)">
            <path fill="#000000" fill-opacity="0.0" d="m0 0l168.6588 0l0 168.21785l-168.6588 0z" fill-rule="evenodd" />
            <path fill="#67daff" d="m0.32939634 84.10761l42.0 -83.99996l84.0 0l41.999992 83.99996l-41.999992 83.99996l-84.0 0z" fill-rule="evenodd" />
            <path stroke="#67daff" stroke-width="1.0" stroke-linejoin="round" stroke-linecap="butt" d="m0.32939634 84.10761l42.0 -83.99996l84.0 0l41.999992 83.99996l-41.999992 83.99996l-84.0 0z" fill-rule="evenodd" />
        </g>
    </svg>
)