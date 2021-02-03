import React from 'react';
import styled from 'styled-components';

export const PostLinkBase = styled.a` 

    display:block;
    color:black;
    text-decoration:none;


    &:hover{
        color: #92B9BD;
        font-size:1.2rem;

    }
`;

export const PostLinkTitle = styled.span`
    display:block;
    font-size: 1rem;
    font-weight:bold;
    color:black;

    padding:5px;
`;
export const PostLinkImage = styled.span`

    display:block;
    width: 100%;


`;

export const PostLinkDate = styled.span`
 
    display:block;
    font-size: 0.7rem;
    color: black;
    padding:5px;
    


`;

function PostLink({title, image, date, url}) {
    return (
        <PostLinkBase href={url}>
            <PostLinkTitle>{title}</PostLinkTitle>
            <PostLinkImage>{image}</PostLinkImage>
            <PostLinkDate>{date}</PostLinkDate>
        </PostLinkBase>
    );
}

export default PostLink;