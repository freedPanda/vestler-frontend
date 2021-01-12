import React, {useState} from 'react';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import {v4 as uuid} from 'uuid';

function PaginationComponent({qty,setIndex}){

    const [active, setActive] = useState(1);

    function handleClick(evt){
        const {name} = evt.target;
        setActive(Number(name));
        setIndex(name * 200);
    }

    //
    let pageNumbers = [];
    for(let i = 1; i < qty; i++){
        pageNumbers.push(i);
    }

    return(
        <Pagination >
            {pageNumbers.map(page =>(
                <PaginationItem key = {uuid()} >
                    <PaginationLink onClick={handleClick} name={page} style={{backgroundColor:active === page ? 'maroon' : 'none'}}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}
        </Pagination>
    )

}

export default PaginationComponent;