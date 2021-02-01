import React from 'react';
import styled from 'styled-components';

export const PageLinkBase = styled.a` 

    display:block;
    color:black;

    &:hover{
        border-color: #92B9BD;
    }

`;

export const PageLinkTitle = styled.span`
    display:block;
    font-size: 1rem;
    font-weight:bold;
    color:black;

`;

export const PageLinkDate = styled.span`
 
    display:block;
    font-size: 0.5rem;
    color: black;

`;

function PostLink({title, date, url}) {
    return (
        <PostLinkBase href={url}>
            <PostLinktitle>{title}</PostLinktitle>
            <PostLinkDate>{date}</PostLinkDate>
        </PostLinkBase>
    );
}

export default PostLink;