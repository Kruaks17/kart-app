import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import Container from '../Container';

export const SiteNavigationBase = styled(Container)`

        display:flex;
        justify-content:center;
        align-items:center;

        padding:5px;

        ul {
            list-style:none;
            margin:4px;
            padding:0;
        }
            li{
                display:inline-block;
            }
            
            &:not(:last-child){
                margin-right:1rem;

            }
            a{
                display:inline-block;
                color:black;
                text-decoration:none;
                border-bottom:1px solid black;

            }
            &:hover{
                color:#92B9BD;
                border-color:#92B9BD;
            }
`;

function SiteNavigation(){

    return(
        <SiteNavigationBase as="nav">
            <ul>
                <li>
                    <NavLink to="/">Hjem</NavLink>
                </li>
                <li>
                    <NavLink to="/about">Om Oss</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Kontakt</NavLink>
                </li>
            </ul>
        </SiteNavigationBase>

    );
}
export default SiteNavigation;