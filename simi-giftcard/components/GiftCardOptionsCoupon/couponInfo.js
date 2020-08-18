import React, { useMemo } from 'react'
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './couponInfo.css'

const CouponInfo = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {codeInfo} = props

    if(!codeInfo) return null

    const info = useMemo(() => {
        if(codeInfo.data && codeInfo.status) {
            const couponInfoHtml = []
            const couponInfoData = codeInfo.data
            for(let i in couponInfoData) {
                const info = couponInfoData[i]
                couponInfoHtml.push(
                    <tr key={i}> 
                        <th>{info.label}</th>
                        <td>{info.value}</td>
                    </tr>
                )
            }

            return couponInfoHtml
        }
    }, [codeInfo]) 

    return (
        <div className={classes.root}>
            <table className={classes.table}>
                <tbody>
                    {info}
                </tbody>
            </table>
        </div>
    )
}

export default CouponInfo