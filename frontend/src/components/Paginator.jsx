import React from 'react'

const Paginator = ({ totalPages, currentPage, setCurrentPage }) => {

    const pagesButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesButtons.push(
            <button
                className={i == currentPage ? 'paginatorButton selected' : 'paginatorButton'}
                key={i}
                onClick={() => setCurrentPage(i)}
            >
                {String(i).padStart(2, "0")}
            </button>
        )
    }

    return (
        <div className='paginator'>
            {pagesButtons}
        </div>
    )
}

export default Paginator