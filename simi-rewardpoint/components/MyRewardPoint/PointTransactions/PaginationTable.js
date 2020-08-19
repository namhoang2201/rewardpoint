import React from 'react'
import Arrow from "../../BaseComponents/Icon/Arrow";
import EmptyData from './EmptyData';
require('./pagination.scss')

class PaginationTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: this.props.currentPage,
            limit: this.props.limit,
            data: this.props.data,
            itemCount: this.props.itemCount
        }
        this.startPage = 1;
        this.endPage = this.startPage + 4;
    }

    renderColumnTitle = () => {
        const data = this.props.cols;
        if (data.length > 0) {
            const columns = data.map((item, index) => {
                return <th key={index} width={item.width ? item.width : ''} >{item.title}</th>
            });
            return (
                <thead>
                    <tr>
                        {columns}
                    </tr>
                </thead>
            )

        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.limit !== prevProps.limit) {
            this.setState({ limit: this.props.limit })
        }
    }

    handleChangePage = (next = true, total) => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
        const currentPage = next ? (this.state.currentPage === total ? this.state.currentPage : this.state.currentPage + 1) : (this.state.currentPage > 1 ? this.state.currentPage - 1 : this.state.currentPage);
        if (currentPage > this.endPage) {
            this.startPage = this.startPage + 1;
            this.endPage = this.endPage + 1;
        } else if (currentPage < this.startPage) {
            this.startPage = this.startPage - 1;
            this.endPage = this.endPage - 1;
        }
        this.setState({
            currentPage: currentPage
        })
    }

    changePage(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
        if (this.props.changedPage) {
            this.props.changedPage(event.target.id)
        }
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
    }

    changeLimit = (e) => {
        const { setLimit } = this.props;
        setLimit(e.target.value)
    }

    renderItem = (item, index) => {
        return this.props.renderItem(item, index)
    };

    renderPageNumber = (total) => {
        // Logic for displaying page numbers
        if (!this.props.showPageNumber) return null;
        const pageNumbers = [];
        const totalItem = total;
        total = Math.ceil(total / this.state.limit);
        const endpage = this.endPage > total ? total : this.endPage
        for (let i = this.startPage; i <= endpage; i++) {
            pageNumbers.push(i);
        }
        const obj = this;
        const renderPageNumbers = pageNumbers.map(number => {
            const active = number === obj.state.currentPage ? 'active' : '';
            return (
                <li
                    role="presentation"
                    key={number}
                    id={number}
                    onClick={(e) => this.changePage(e)}
                    className={`'page-nums' ${active}`}
                >
                    {number}
                </li>
            );
        });
        const option_limit = [];
        if (this.props.itemsPerPageOptions) {
            this.props.itemsPerPageOptions.map((item, index) => {
                option_limit.push(<option key={index} value={item} >{item}</option>);
                return null
            }
            );
        }
        const nextPageIcon = <Arrow style={{ width: 20, height: 20, transform: 'rotate(90deg)' }} />;
        const prevPageIcon = <Arrow style={{ width: 20, height: 20, transform: 'rotate(-90deg)' }} />;

        const pagesSelection = (total > 1) ? (
            <ul id="page-numbers">
                <li role="presentation" className={`icon-page-number ${this.state.currentPage === 1 ? 'first-page' : ''}`} onClick={() => this.state.currentPage === 1 ? {} : this.handleChangePage(false, total)}>{prevPageIcon}</li>
                {renderPageNumbers}
                <li role="presentation" className={`icon-page-number ${this.state.currentPage === total ? 'final-page' : ''}`} onClick={() => this.state.currentPage === total ? {} : this.handleChangePage(true, total)}>{nextPageIcon}</li>
            </ul>
        ) : '';

        return (
            pagesSelection && <div className="config-page"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    clear: 'both'
                }}
            >
                <div className="total-items">
                    {totalItem} {'items'}
                </div>
                {pagesSelection}
            </div>
        )
    }

    renderPagination = () => {
        const { data, currentPage, limit } = this.state;
        if (data.length > 0) {
            // Logic for displaying current todos
            const indexOfLastTodo = currentPage * limit;
            const indexOfFirstTodo = indexOfLastTodo - limit;
            const currentObj = data.slice(indexOfFirstTodo, indexOfLastTodo);
            const obj = this;
            const items = currentObj.map((item, key) => {
                return obj.renderItem(item, key);
            });
            const total = data.length;
            return (
                <React.Fragment>
                    <table className='col-xs-12 table-rw table'>
                        {this.renderColumnTitle()}
                        <tbody>{items}</tbody>
                    </table>
                    {this.renderPageNumber(total)}
                </React.Fragment>
            )
        } else
            return <EmptyData message={"You have no transactions !."} />
    }

    render() {
        return this.renderPagination();
    }
}

export default PaginationTable
