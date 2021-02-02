import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

import Container from '../Container';

export const SiteNavigationBase = styled(Container)`

        display:flex;
        justify-content:center;
        align-items:center;

        padding:5px;

        background-color:black;

        width:100%;

        border-radius: 50px;

        margin-bottom: 30px;

        ul {
            list-style:none;
            margin:4px;
            padding:0;
            background-color:black;
        }
            li{
                display:inline-block;
                background-color:black;
            }
            
            &:not(:last-child){
                margin-right:1rem;

            }
            a{
                font-size:1rem;
                font-weight:bold;
                font-style: normal;

                display:inline-block;
                
                color:#e8eddf;
                
                text-decoration:none;

                
                
                border:none;
                background-color:black;
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
                    <NavLink to="/bryggerier">Bryggerier</NavLink>
                </li>
                <li>
                    <NavLink to="/om-oss">Om Oss</NavLink>
                </li>
                
               
            </ul>
        </SiteNavigationBase>

    );
}
export default SiteNavigation;