import React from 'react'
import { Price } from '@magento/peregrine'
import PropTypes from 'prop-types'
import {randomString} from '@simicart/simi-module/util/randomKey';

const Total = props => {
    const { currencyCode, data, isMiniCart } = props
    if (!data)
        return ''
    const { total_segments, extension_attributes } = data;
    const { spend_points } = extension_attributes;
    const totalRows = []
    total_segments.sort((a, b) => {
        switch (a.code) {
            case 'grand_total':
                return 90;
            case 'shipping':
                return 80;
            default:
                return 0;
        }
    })
    let grandTotal = null;
    total_segments.forEach((item, index) => {
        if (item.value && item.code !== 'grand_total')
            //  if minicart -> add all
            if (isMiniCart) {
                totalRows.push(
                    <div key={index} className={props.classes.itemtotal}>
                        <span className={props.classes.label}>{item.title}: </span>
                        <span className={props.classes.value}>
                            {item.code === 'earn_point' ?<span style={{ color: '#000000', fontWeight: 'normal' }}>{item.value}</span> : <Price currencyCode={currencyCode} value={item.value} />}
                            {item.code === 'spend_point' && spend_points > 0 ? <span style={{ color: '#000000', fontWeight: 'normal' }}> ({spend_points} points)</span> : ''}
                        </span>
                    </div>
                )
            } else {
                // not minicart (cartpage, checkout) -> only add spend_point, earn_point
                if (item.code === 'spend_point' || item.code === 'earn_point') {
                    totalRows.push(
                        <div key={index} className={props.classes.itemtotal}>
                            <span className={props.classes.label}>{item.title}: </span>
                            <span className={props.classes.value}>
                                {item.code === 'earn_point' ? <span style={{ color: '#000000', fontWeight: 'normal' }}>{item.value} point(s)</span> : <Price currencyCode={currencyCode} value={item.value} />}
                                {item.code === 'spend_point' && spend_points > 0 ? <span style={{ color: '#000000', fontWeight: 'normal' }}> ({spend_points} points)</span> : ''}
                            </span>
                        </div>
                    )
                }
            }
        if (item.code === 'grand_total') {
            grandTotal = item;
        }
    })
    if (isMiniCart) {
        totalRows.push(
            <div key={randomString(5)} className={props.classes.itemtotal}>
                <span className={props.classes.grandLabel}>{grandTotal.title}: </span>
                <span className={props.classes.grand}><Price currencyCode={currencyCode} value={grandTotal.value} /></span>
            </div>
        )
    }

    return (
        <div className={props.classes.cartTotal} >
            {totalRows}
        </div>
    )
}
Total.contextTypes = {
    currencyCode: PropTypes.string,
    data: PropTypes.object,
};

export default Total
