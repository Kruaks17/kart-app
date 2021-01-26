import React from 'react';
import styled from 'styled-components';

export const PageLinkBase = styled.a` 

    display:block;

    &:hover{
        border-color: #92B9BD;
    }

`;

export const PageLinkTitle = styled.span`
    display:block;
    font-size: 1rem;
    font-weight:bold;

`;

export const PageLinkDate = styled.span`
 
    display:block;
    font-size: 0.5rem;
    color: lightgrey;

`;

function PostLink({title, date, url}) {
    
    returm (
        <PostLinkBase href={url}>
            <PostLinktitle>{title}</PostLinktitle>
            <PostLinkDate>{date}</PostLinkDate>
        </PostLinkBase>
    );
}

export default PostLink;