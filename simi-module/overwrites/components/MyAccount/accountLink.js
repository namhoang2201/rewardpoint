import React, { useCallback } from 'react';
import { arrayOf, func, node, shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import { Link } from 'react-router-dom'

import defaultClasses from '@magento/venia-ui/lib/components/MyAccount/accountLink.css';

const AccountLink = props => {
    const { children, onClick } = props;
    const [icon, text] = children;
    const classes = mergeClasses(defaultClasses, props.classes);

    const handleClick = useCallback(() => {
        if (typeof onClick === 'function') {
            onClick();
        }
    }, [onClick]);

    if (props.link) {
        return (
            <Link to={props.link}>
                <Button classes={classes} onClick={handleClick}>
                    <span className={classes.icon}>{icon}</span>
                    <span className={classes.text}>{text}</span>
                </Button>
            </Link>
        )
    }

    return (
        <Button classes={classes} onClick={handleClick}>
            <span className={classes.icon}>{icon}</span>
            <span className={classes.text}>{text}</span>
        </Button>
    );
};

export default AccountLink;

AccountLink.propTypes = {
    children: arrayOf(node).isRequired,
    classes: shape({
        content: string,
        icon: string,
        root: string,
        root_highPriority: string,
        root_lowPriority: string,
        root_normalPriority: string,
        text: string
    }),
    onClick: func
};
