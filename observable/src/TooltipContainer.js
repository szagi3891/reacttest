/* @flow */
import React, { Component } from 'react';
import { Subject } from 'rxjs';

import Tooltip from './Tooltip';

class TooltiopContainer extends Component {

    _command: Subject<'show' | 'hide'> = new Subject();

    render() {
        const style = {
          'width': '400px',
          'margin': '0 auto',
          'border': '1px solid red',
          'padding': '10px',
          'backgroundColor': '#a0a0a0'
        };

        const styleTooltip = {
            'width': '200px',
            'margin': '0 auto',
            'border': '1px solid red',
            'padding': '10px',
            'backgroundColor': '#e0e0e0'
        };

        return (
            <div style={style}>
                <i>Container</i>
                <div onClick={this._show.bind(this)}>Show</div>
                <div onClick={this._hide.bind(this)}>Hide</div>

                <div style={styleTooltip}>
                    <Tooltip command={this._command.asObservable()} />
                </div>

            </div>
        );
    }

    _show() {
        this._command.next('show');
    }

    _hide() {
        this._command.next('hide');
    }
}

export default TooltiopContainer;
