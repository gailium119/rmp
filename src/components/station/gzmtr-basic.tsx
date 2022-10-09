import React from 'react';
import { CityCode } from '@railmapgen/rmg-palette-resources';
import { CanvasType, CategoriesType } from '../../constants/constants';
import {
    defaultStationAttributes,
    Station,
    StationAttributes,
    StationComponentProps,
    StationType,
} from '../../constants/stations';

const PATH = 'M0,9.25 V-9.25 H-9.25 a9.25,9.25 0 0,0 0,18.5 h18.5 a9.25,9.25 0 0,0 0,-18.5 H0';

const GzmtrBasicStation = (props: StationComponentProps) => {
    const { id, x, y, attrs, handlePointerDown, handlePointerMove, handlePointerUp } = props;
    const {
        names = defaultStationAttributes.names,
        nameOffsetX = defaultGzmtrStationAttributes.nameOffsetX,
        nameOffsetY = defaultGzmtrStationAttributes.nameOffsetY,
        lineCode = defaultGzmtrStationAttributes.lineCode,
        stationCode = defaultGzmtrStationAttributes.stationCode,
    } = attrs[StationType.GzmtrBasic] ?? defaultGzmtrStationAttributes;

    const onPointerDown = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerDown(id, e),
        [id, handlePointerDown]
    );
    const onPointerMove = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerMove(id, e),
        [id, handlePointerMove]
    );
    const onPointerUp = React.useCallback(
        (e: React.PointerEvent<SVGElement>) => handlePointerUp(id, e),
        [id, handlePointerUp]
    );

    const textX = nameOffsetX === 'left' ? -15 : nameOffsetX === 'right' ? 15 : 0;
    const textY = nameOffsetY === 'up' ? -24 : nameOffsetY === 'bottom' ? 12 : -3;
    const textAnchor = nameOffsetX === 'left' ? 'end' : nameOffsetX === 'right' ? 'start' : 'middle';
    const dominantBaseline = nameOffsetY === 'up' ? 'auto' : nameOffsetY === 'bottom' ? 'hanging' : 'middle';
    const enDy = dominantBaseline === 'hanging' ? 15 : 12;

    return React.useMemo(
        () => (
            <g id={id} transform={`translate(${x}, ${y})`}>
                <path d={PATH} stroke="black" fill="white" transform="scale(0.75)" />
                <g>
                    <text dx="-6" textAnchor="middle" dominantBaseline="middle" fontSize="8" className="rmp-name__en">
                        {lineCode}
                    </text>
                    <text dx="6" textAnchor="middle" dominantBaseline="middle" fontSize="8" className="rmp-name__en">
                        {stationCode}
                    </text>
                </g>
                {/* Below is a overlay element that has all event hooks but can not be seen. */}
                <path
                    id={`stn_core_${id}`}
                    d={PATH}
                    fill="white"
                    fillOpacity="0"
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    style={{ cursor: 'move' }}
                    transform="scale(0.75)"
                />
                <g transform={`translate(${textX}, ${textY})`} className="rmp-name-station">
                    <text textAnchor={textAnchor} dominantBaseline={dominantBaseline} className="rmp-name__zh">
                        {names[0]}
                    </text>
                    <text
                        fontSize={10}
                        dy={enDy}
                        textAnchor={textAnchor}
                        dominantBaseline={dominantBaseline}
                        className="rmp-name__en"
                    >
                        {names[1]}
                    </text>
                </g>
            </g>
        ),
        [id, x, y, ...names, nameOffsetX, nameOffsetY, lineCode, stationCode, onPointerDown, onPointerMove, onPointerUp]
    );
};

/**
 * <GzmtrStation /> specific props.
 */
export interface GzmtrStationAttributes extends StationAttributes {
    nameOffsetX: 'left' | 'middle' | 'right';
    nameOffsetY: 'up' | 'middle' | 'bottom';
    lineCode: string;
    stationCode: string;
}

const defaultGzmtrStationAttributes: GzmtrStationAttributes = {
    ...defaultStationAttributes,
    nameOffsetX: 'right',
    nameOffsetY: 'up',
    lineCode: '1',
    stationCode: '01',
};

const gzmtrBasicStationFields = [
    {
        type: 'input',
        label: 'panel.details.station.gzmtrBasic.nameZh',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).names[0],
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.names[0] = val.toString();
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'input',
        label: 'panel.details.station.gzmtrBasic.nameEn',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).names[1],
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.names[1] = val.toString();
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'select',
        label: 'panel.details.station.gzmtrBasic.nameOffsetX',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).nameOffsetX,
        options: { left: 'left', middle: 'middle', right: 'right' },
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.nameOffsetX = val as 'left' | 'middle' | 'right';
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'select',
        label: 'panel.details.station.gzmtrBasic.nameOffsetY',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).nameOffsetY,
        options: { up: 'up', middle: 'middle', bottom: 'bottom' },
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.nameOffsetY = val as 'up' | 'middle' | 'bottom';
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'input',
        label: 'panel.details.station.gzmtrBasic.lineCode',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).lineCode,
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.lineCode = val.toString();
            // return modified attrs
            return attrs;
        },
    },
    {
        type: 'input',
        label: 'panel.details.station.gzmtrBasic.stationCode',
        value: (attrs?: GzmtrStationAttributes) => (attrs ?? defaultGzmtrStationAttributes).stationCode,
        onChange: (val: string | number, attrs_: GzmtrStationAttributes | undefined) => {
            // set default value if switched from another type
            const attrs = attrs_ ?? defaultGzmtrStationAttributes;
            // set value
            attrs.stationCode = val.toString();
            // return modified attrs
            return attrs;
        },
    },
];

const gzmtrBasicStationIcon = (
    <svg viewBox="0 0 24 24" height={40} width={40} focusable={false}>
        <path d={PATH} fill="none" stroke="currentColor" strokeWidth="2" transform="translate(12,12)scale(0.5)" />
        <text x="8" y="12.5" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            1
        </text>
        <text x="16" y="12.5" fontSize="6" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">
            01
        </text>
    </svg>
);

const gzmtrBasicStation: Station<GzmtrStationAttributes> = {
    component: GzmtrBasicStation,
    icon: gzmtrBasicStationIcon,
    defaultAttrs: defaultGzmtrStationAttributes,
    // TODO: fix this
    // @ts-ignore-error
    fields: gzmtrBasicStationFields,
    metadata: {
        displayName: 'panel.details.station.gzmtrBasic.displayName',
        cities: [CityCode.Guangzhou],
        canvas: [CanvasType.RailMap],
        categories: [CategoriesType.Metro],
        tags: [],
    },
};

export default gzmtrBasicStation;
