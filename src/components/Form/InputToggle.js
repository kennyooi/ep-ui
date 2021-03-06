/**
 * Normal toggle input
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Ripple from '../Ripple';

import './style.less';
import './InputToggle.less';


export default class InputToggle extends PureComponent {

    static propTypes = {
        theme       : PropTypes.string,     // checkbox theme color
        checked     : PropTypes.bool,       // checkbox checked status
        disabled    : PropTypes.bool,       // checkbox disabled
        onChange    : PropTypes.func        // onChange event
    };

    static defaultProps = {
        className   : '',
        theme       : 'default'
    };

    constructor(props) {
        super(props);

        // actions
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
    }

    render() {
        const { children, className, checked, disabled, theme, ...others } = this.props;

        const inputProps = {
            type     : 'checkbox',
            checked  : checked ? 'checked' : '',
            disabled : disabled,
            ...others
        };

        return (
            <label
                className={classNames('input-toggle', className, {
                    [`theme-${theme}`]  : theme !== '',
                    'input__checked'    : checked,
                    'input__disabled'   : disabled
                })}
                onMouseDown={this._onMouseDown}
                onMouseUp={this._onMouseUp}
                onMouseOut={this._onMouseUp}
            >
                <input
                    {...inputProps}
                />
                {children &&
                    <div className='input-label'>{children}</div>
                }
                <div className='input-toggle-lever'>
                    <div className='input-toggle-lever-btn' ref={el => this.__leverEl = el}>
                        <Ripple
                            ref={el => this.__rippleEl = el}
                            theme={checked ? theme : 'default'}
                            speed='fast'
                        />
                    </div>
                </div>
            </label>
        );
    }

    _onMouseDown() {
        const { disabled } = this.props;

        // Check disabled
        if (disabled) {
            return;
        }

        const pos = {
            x   : this.__leverEl.clientWidth / 2,
            y   : this.__leverEl.clientHeight / 2
        };
        const scale = (this.__leverEl.clientWidth / 10) * 2;

        this.__rippleEl.show(pos, scale);
    }

    _onMouseUp() {
        const { disabled } = this.props;

        // Check disabled
        if (disabled) {
            return;
        }

        this.__rippleEl.hide();
    }
}