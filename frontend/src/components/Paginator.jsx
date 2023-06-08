import React from 'react'

const Paginator = ({ totalDocuments, currentPage, setCurrentPage, setLoading }) => {
    const totalPages = Math.ceil(totalDocuments/5);

    const pagesButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pagesButtons.push(
            <button
                className={i == currentPage ? 'paginatorButton selected' : 'paginatorButton'}
                key={i}
                onClick={() => {
                    setLoading(true)
                    setCurrentPage(i)
                }}
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