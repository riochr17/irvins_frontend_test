import React from 'react';
import './GeneralTable.scss';

export default class GeneralTable extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="general-table">
            <div className="general-table--container">
                <div className="general-table--group-header">
                    <div className="general-table--group-header--row">
                    {
                        this.props.header.map((item, i) => (
                            <div
                                key={i} 
                                className="general-table--group-header--row--col">
                                <div className="general-table--group-header--row--col--cell">
                                    { item.label }
                                </div>
                            </div>
                        ))
                    }
                    {
                        this.props.header_action.map((item, i) => (
                            <div 
                                key={i} 
                                className="general-table--group-header--row--col">
                                <div className="general-table--group-header--row--col--cell">
                                    { item.label }
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                <div className="general-table--group-body">
                    {
                        this.props.data.map((data_row, i) => (
                            <div
                                key={i} 
                                className="general-table--group-body--row">
                            {
                                this.props.header.map((header_item, j) => (
                                    <div
                                        key={j} 
                                        className="general-table--group-body--row--col">
                                        <div className="general-table--group-body--row--col--cell">
                                            { (typeof header_item.key) === 'function'
                                             ? header_item.key(data_row)
                                             : data_row[header_item.key] }
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                this.props.header_action.map((header_item, j) => (
                                    <div
                                        key={j} 
                                        className="general-table--group-body--row--col">
                                        <div className="general-table--group-body--row--col--cell">
                                            <a href="#" onClick={e => header_item.action(data_row)}>
                                                { header_item.item_label(data_row) }
                                            </a>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>;
    }
}
