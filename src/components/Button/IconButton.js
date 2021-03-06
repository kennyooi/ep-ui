/**
 * Icon Button
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ReactTooltip from 'react-tooltip';
import Ripple from '../Ripple';

import './style.less';
import './IconButton.less';


export default class IconButton extends PureComponent {

    static propTypes = {
        TagName     : PropTypes.string,     // Tagname for button
        theme       : PropTypes.string,     // button theme
        size        : PropTypes.string,     // button size
        tooltip     : PropTypes.string,     // enable tooltip for button
        tooltipId   : PropTypes.string,     // unique tooltip ID
        icon        : PropTypes.string,     // Button icon
        disabled    : PropTypes.bool      // Button icon
    };

    static defaultProps = {
        TagName     : 'button',
        className   : ''
    };

    constructor(props) {
        super(props);

        if (props.tooltip) {
            this.__uniqId = props.tooltipId || (new Date().getTime()).toString();
        }

        // actions
        this._onClick = this._onClick.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
    }

    render() {
        const { TagName, className, icon, theme, size, tooltip, ...others } = this.props;

        const props = {
            ...others,
            ref         : c => this.el = c,
            className   : classNames('btn-icon', className, {
                [`btn-${size}`]  : size,
                [`btn-${theme}`] : theme
            }),
            onClick     : this._onClick,
            onMouseDown : this._onMouseDown,
            onMouseUp   : this._onMouseUp,
            onMouseOut  : this._onMouseOut
        };

        const childs = [];

        // Enable effect
        childs.push((
            <Ripple
                key="ripple"
                ref={c => this.rippleEl = c}
                theme="default"
                speed="fast"
            />
        ));

        // Enable tooltip
        let inner_props = {};
        if (tooltip) {
            inner_props = {
                'data-tip' : tooltip ? true : undefined,
                'data-for' : this.__uniqId,
                'data-offset': '{ \'top\': -16 }'
            };

            childs.push((
                <ReactTooltip id={this.__uniqId} effect='solid' key='tooltip'>
                    {tooltip}
                </ReactTooltip>
            ));
        }

        // Children
        childs.push((
            <div className="btn-inner" key="inner" {...inner_props}>
                <i className={icon}></i>
            </div>
        ));

        return (
            <TagName {...props}>
                {childs}
            </TagName>
        );
    }

    _onClick(e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

    _onMouseDown(e) {
        const { onMouseDown, disabled } = this.props;

        // Check button disabled
        if (disabled) {
            return;
        }

        const pos = {
            x : this.el.clientWidth / 2,
            y : this.el.clientHeight / 2
        };
        const scale = (this.el.clientHeight / 10);

        this.rippleEl.show(pos, scale);

        if (onMouseDown) {
            onMouseDown(e);
        }
    }

    _onMouseUp(e) {
        const { onMouseUp, disabled } = this.props;

        // Check button disabled
        if (disabled) {
            return;
        }

        this.rippleEl.hide();

        if (onMouseUp) {
            onMouseUp(e);
        }
    }

    _onMouseOut(e) {
        const { onMouseOut, disabled } = this.props;

        // Check button disabled
        if (disabled) {
            return;
        }

        this.rippleEl.hide();

        if (onMouseOut) {
            onMouseOut(e);
        }
    }
}